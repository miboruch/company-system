import { useReducer, useEffect, useRef } from 'react';
import { ErrorResponse } from 'api/api.middleware';
import memoizee from 'memoizee';

type SuccessCallback<T> = (
  // @ts-ignore
  callback: (payload: NonNullable<Unwrap<T>>[0]) => void,
  dependencies?: any[]
) => void;

type ErrorCallback = (callback: (error: NonNullable<ErrorResponse>) => void, dependencies?: any[]) => void;
type ArgumentType<T> = T extends (...args: infer A) => any ? A : never;

type Unwrap<T> = T extends (...args: any) => () => Promise<infer U> ? U : T extends (...args: any) => Promise<infer U> ? U : T;
//TODO: try to extract value from array without ts-ignore

interface Options<T> {
  // @ts-ignore
  onSuccess?: (payload: NonNullable<Unwrap<T>>[0]) => void;
  onError?: (error: NonNullable<ErrorResponse>) => void;
}

type Action = { type: 'setSubmitting'; isSubmitting: boolean } | { type: 'setData'; data: any } | { type: 'setError'; error: any } | { type: 'setDetails'; details: any };

type Status = { status: number; isCanceled: boolean };
type State = { isSubmitting: boolean; error: any; data: any; errorDetails: Status };

type Actions = {
  setSubmitting: (isSubmitting: boolean) => void;
  setData: (data: any) => void;
  setError: (error: any) => void;
  setDetails: (details: Status) => void;
};

const initialState: State = {
  isSubmitting: false,
  error: null,
  data: null,
  errorDetails: { status: 0, isCanceled: false }
};

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'setSubmitting':
      return { ...state, isSubmitting: action.isSubmitting };
    case 'setData':
      return { ...state, data: action.data };
    case 'setError':
      return { ...state, error: action.error };
    case 'setDetails':
      return { ...state, errorDetails: action.details };
  }
};

function useCall<T>(asyncApiCall: (...options: any) => Promise<[any | null, null | ErrorResponse, Status]>) {
  const componentIsMounted = useRef(true);

  const handleComponentMount = () => {
    componentIsMounted.current = true;
  };
  const handleWillComponentUnmount = () => {
    componentIsMounted.current = false;
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const actions: Actions = {
    setSubmitting: (isSubmitting: boolean) => dispatch({ type: 'setSubmitting', isSubmitting }),
    setData: (data: any) => dispatch({ type: 'setData', data }),
    setError: (error: any) => dispatch({ type: 'setError', error }),
    setDetails: (details: Status) => dispatch({ type: 'setDetails', details })
  };

  const onCallSuccess = useRef<Options<T>['onSuccess'] | null>(null);
  const onCallError = useRef<Options<T>['onError'] | null>(null);

  useEffect(() => {
    handleComponentMount();

    return () => handleWillComponentUnmount();
  }, []);

  const memoizeOptions = {
    normalizer: (args: any) => JSON.stringify(args[1])
  };

  const handleCall = async (...args: ArgumentType<T>) => {
    const { setSubmitting, setData, setError, setDetails } = actions;

    setSubmitting(true);
    setError(null);

    const [payload, error, details] = await asyncApiCall(...args);

    if (!componentIsMounted.current) {
      return;
    }
    if (error && !details.isCanceled && details.status !== 0) {
      setError(error);
      onCallError.current && onCallError.current(error);
      setDetails(details);
      setSubmitting(false);
    }
    if (!details.isCanceled) {
      setData(payload);
      onCallSuccess.current && onCallSuccess.current(payload);
      setDetails(details);
      setSubmitting(false);
    }
  };

  const handleSuccess = memoizee((successCall: Options<T>['onSuccess']) => {
    onCallSuccess.current = successCall;
  }, memoizeOptions);

  const handleError = memoizee((errorCall: Options<T>['onError']) => {
    onCallError.current = errorCall;
  }, memoizeOptions);

  return {
    error: state.error as ErrorResponse,
    isSubmitting: state.isSubmitting,
    submit: handleCall,
    onCallSuccess: handleSuccess as SuccessCallback<T>,
    onCallError: handleError as ErrorCallback
  };
}

export default useCall;
