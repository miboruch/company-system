import { useReducer, useEffect, useRef } from 'react';
import memoizee from 'memoizee';

const SET_SUBMITTING = 'SET_SUBMITTING';
const SET_DATA = 'SET_DATA';
const SET_ERROR = 'SET_ERROR';
const SET_STATUS = 'SET_STATUS';

import { ErrorResponse, Status } from 'api/api.middleware';

type ApiCall = (...args: any) => Promise<[any | null, ErrorResponse | null, Status]>;
type ApiCallArguments<T> = T extends (...args: infer A) => any ? A : never;
type ApiCallReturnType = ReturnType<ApiCall>;

type ResolvedPromise<T extends ApiCallReturnType> = T extends Promise<[infer R, ErrorResponse | null, Status]> ? R : never;

type SuccessCallback<T extends ApiCall> = (callback: (payload: NonNullable<ResolvedPromise<ReturnType<T>>>) => void) => void;
type ErrorCallback = (callback: (error: NonNullable<ErrorResponse>) => void, dependencies?: any[]) => void;

interface Options<T> {
  // @ts-ignore
  onCallSuccess?: (payload: NonNullable<ResolvedPromise<ApiCallReturnType>>) => void;
  onCallError?: (error: NonNullable<ErrorResponse>) => void;
}

interface ReturnHookTypes<T extends ApiCall> {
  error: ErrorResponse;
  isSubmitting: boolean;
  submit: (...args: ApiCallArguments<T>) => Promise<void>;
  onCallSuccess: SuccessCallback<T>;
  onCallError: ErrorCallback;
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

function useCall<T extends ApiCall>(asyncApiCall: T): ReturnHookTypes<T> {
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

  const handleCall = async (...args: ApiCallArguments<T>) => {
    const { setSubmitting, setData, setError, setStatus } = actions;

    setSubmitting(true);
    setError(null);

    const [payload, error, status] = await asyncApiCall(...args);

    if (!componentIsMounted.current) {
      return;
    } else if (error && !status.isCanceled) {
      setError(error);
      setStatus(status);
      onCallError.current && onCallError.current(error);
      setSubmitting(false);
    } else if (!status.isCanceled) {
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
    onCallSuccess: handleSuccess,
    onCallError: handleError
  };
}

export default useCall;
