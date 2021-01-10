import { useReducer, useEffect, useRef } from 'react';

import { ErrorResponse, Status } from 'api/api.middleware';
import { EmployeeDataInterface } from 'types/modelsTypes';

interface Options<T> {
  // @ts-ignore
  onSuccess?: (payload: NonNullable<Unwrap<T>[0]>) => void;
  // onSuccess?: (payload: NonNullable<PromiseData<ReturnType<T>>[0]>) => void;
  onError?: (error: NonNullable<ErrorResponse>) => void;
  dependencies?: any[];
}

interface Actions {
  setLoading: (loading: boolean) => void;
  setData: (data: any) => void;
  setError: (error: any) => void;
  setDetails: (details: Status) => void;
}

type first = Unwrap<() => Promise<[EmployeeDataInterface | null, ErrorResponse | null, Status]>>[0];

export interface UseFetchData<T> {
  // @ts-ignore
  payload: Unwrap<T>[0]; //TODO: try to extract value from array without ts-ignore
  // payload: PromiseData<ReturnType<T>>[0];
  loading: boolean;
  error: null | ErrorResponse;
  details: Status;
  actions: Actions;
  refresh: () => Promise<void>;
}

type NonNullable<T> = Exclude<T, null | undefined>;
type PromiseData<T> = T extends PromiseLike<infer U> ? U : T;

type Unwrap<T> = T extends (...args: any) => () => Promise<infer U> ? U : T extends (...args: any) => Promise<infer U> ? U : T;
//TODO: try to extract value from array without ts-ignore

type State = { data: any; error: null | ErrorResponse; loading: boolean; details: Status };
type Action = { type: 'setLoading'; loading: boolean } | { type: 'setData'; data: any } | { type: 'setError'; error: null | ErrorResponse } | { type: 'setDetails'; details: Status };

const initialState: State = {
  data: null,
  error: null,
  loading: true,
  details: { status: 0, isCanceled: false }
};

const initialOptions = {
  dependencies: [],
  onSuccess: () => null,
  onError: () => null
};

const reducer = (state: any, action: Action) => {
  switch (action.type) {
    case 'setLoading':
      return { ...state, loading: action.loading };
    case 'setData':
      return { ...state, data: action.data };
    case 'setError':
      return { ...state, error: action.error };
    case 'setDetails':
      return { ...state, details: action.details };
  }
}

function useFetch<T>(
  asyncApiCall: (...options: any) => Promise<[any | null, null | ErrorResponse, Status]>,
  { dependencies = [], onSuccess = () => null, onError = () => null }: Options<T> = initialOptions
): UseFetchData<T> {
  const componentIsMounted = useRef(true);

  const handleComponentMount = () => {
    componentIsMounted.current = true;
  }
  const handleWillComponentUnmount = () => {
    componentIsMounted.current = false;
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  const actions: Actions = {
    setLoading: (loading) => dispatch({ type: 'setLoading', loading }),
    setData: (data) => dispatch({ type: 'setData', data }),
    setError: (error) => dispatch({ type: 'setError', error }),
    setDetails: (details) => dispatch({ type: 'setDetails', details })
  };

  const handleFetch = async () => {
    const { setLoading, setData, setError, setDetails } = actions;

    setLoading(true);
    setError(null);

    const [data, error, { status, isCanceled }] = await asyncApiCall();

    if (!componentIsMounted.current) {
      return;
    }
    if (error && !isCanceled && status !== 0) {
      setError(error);
      onError && onError(error);
      setDetails({ status, isCanceled });
      setLoading(false);
    }
    if (!isCanceled) {
      setData(data);
      onSuccess && onSuccess(data);
      setDetails({ status, isCanceled });
      setLoading(false);
    }
  };

  useEffect(() => {
    handleComponentMount();

    return () => handleWillComponentUnmount();
  }, []);

  useEffect(() => {
    (async () => {
      await handleFetch();
    })();
  }, dependencies || []);

  return {
    payload: state.data,
    loading: state.loading,
    error: state.error,
    details: state.details,
    actions,
    refresh: handleFetch
  };
}

export default useFetch;
