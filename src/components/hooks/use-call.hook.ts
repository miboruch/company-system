import { useReducer, useEffect, useRef } from 'react';
import memoizee from 'memoizee';

const SET_SUBMITTING = 'SET_SUBMITTING';
const SET_DATA = 'SET_DATA';
const SET_ERROR = 'SET_ERROR';
const SET_STATUS = 'SET_STATUS';

import { ErrorResponse, Status } from 'api/api.middleware';

type Unwrap<T> = T extends (...args: any) => () => Promise<infer U> ? U : T extends (...args: any) => Promise<infer U> ? U : T;
type Argument<T> = T extends (...args: infer A) => any ? A : never;

type ApiCall = (...args: any) => Promise<[any | null, ErrorResponse | null, Status]>;
type ApiCallArguments<T> = T extends (...args: infer A) => any ? A : never;
type ApiCallReturnType = ReturnType<ApiCall>;

type ResolvedPromise<T extends ApiCallReturnType> = T extends Promise<[infer R, ErrorResponse | null, Status]> ? R : never;

type SuccessCallback<T> = (
  // @ts-ignore
  callback: (payload: NonNullable<Unwrap<T>>[0]) => void,
  dependencies?: any[]
) => void;

type ErrorCallback = (callback: (error: ErrorResponse) => void, dependencies?: any[]) => void;

interface Options<T> {
  // @ts-ignore
  onCallSuccess?: (payload: NonNullable<Unwrap<T>>[0]) => void;
  onCallError?: (error: NonNullable<ErrorResponse>) => void;
}

type Action =
  | { type: typeof SET_SUBMITTING; isSubmitting: boolean }
  | { type: typeof SET_DATA; data: any }
  | { type: typeof SET_ERROR; error: ErrorResponse | null }
  | { type: typeof SET_STATUS; status: Status };

type Actions = {
  setSubmitting: (isSubmitting: boolean) => void;
  setData: (data: any) => void;
  setError: (error: any) => void;
  setStatus: (status: Status) => void;
};

type State = { isSubmitting: boolean; error: ErrorResponse | null; data: any; status: Status };

const initialState: State = {
  isSubmitting: false,
  error: null,
  data: null,
  status: { status: 0, isCanceled: false }
};

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case SET_SUBMITTING:
      return { ...state, isSubmitting: action.isSubmitting };
    case SET_DATA:
      return { ...state, data: action.data };
    case SET_ERROR:
      return { ...state, error: action.error };
    case SET_STATUS:
      return { ...state, status: action.status };
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
    setSubmitting: (isSubmitting: boolean) => dispatch({ type: SET_SUBMITTING, isSubmitting }),
    setData: (data: any) => dispatch({ type: SET_DATA, data }),
    setError: (error: any) => dispatch({ type: SET_ERROR, error }),
    setStatus: (status: Status) => dispatch({ type: SET_STATUS, status })
  };

  const onCallSuccess = useRef<Options<T>['onCallSuccess'] | null>(null);
  const onCallError = useRef<Options<T>['onCallError'] | null>(null);

  useEffect(() => {
    handleComponentMount();

    return () => handleWillComponentUnmount();
  }, []);

  const memoizeOptions = {
    normalizer: (args: any) => JSON.stringify(args[1])
  };

  const handleCall = async (...args: Argument<T>) => {
    const { setSubmitting, setData, setError, setStatus } = actions;

    setSubmitting(true);
    setError(null);

    const [payload, error, status] = await asyncApiCall(...args);

    if (!componentIsMounted.current) {
      return;
    }
    if (error && !status.isCanceled && status.status !== 0) {
      setError(error);
      setStatus(status);
      onCallError.current && onCallError.current(error);
      setSubmitting(false);
    }
    if (!status.isCanceled) {
      setData(payload);
      setStatus(status);
      onCallSuccess.current && onCallSuccess.current(payload);
      setSubmitting(false);
    }
  };

  const handleSuccess = memoizee((successCall: Options<T>['onCallSuccess']) => {
    onCallSuccess.current = successCall;
  }, memoizeOptions);

  const handleError = memoizee((errorCall: Options<T>['onCallError']) => {
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
