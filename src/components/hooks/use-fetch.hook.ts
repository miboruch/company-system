import { useReducer, useEffect, useRef } from 'react';
import { ErrorResponse, Status } from 'api/api.middleware';

const SET_LOADING = 'SET_LOADING';
const SET_DATA = 'SET_DATA';
const SET_ERROR = 'SET_ERROR';
const SET_STATUS = 'SET_STATUS';

type PromiseUnwrap<T> = T extends (...args: any) => () => Promise<infer U> ? U : T extends (...args: any) => Promise<infer U> ? U : T;

interface Options<T> {
  // @ts-ignore
  onSuccess?: (payload: NonNullable<PromiseUnwrap<T>[0]>) => void;
  onError?: (error: NonNullable<ErrorResponse>) => void;
  dependencies?: any[];
  conditions?: boolean;
}

interface Actions {
  setLoading: (loading: boolean) => void;
  setData: (data: any) => void;
  setError: (error: any) => void;
  setStatus: (status: Status) => void;
}

export interface UseFetchReturnData<T> {
  // @ts-ignore
  payload: PromiseUnwrap<T>[0];
  loading: boolean;
  error: null | ErrorResponse;
  status: Status;
  actions: Actions;
  refresh: () => Promise<void>;
}

type Action =
  | { type: typeof SET_LOADING; loading: boolean }
  | { type: typeof SET_DATA; data: any }
  | { type: typeof SET_ERROR; error: null | ErrorResponse }
  | { type: typeof SET_STATUS; status: Status };

type State = { data: any; error: null | ErrorResponse; loading: boolean; status: Status };

const initialState: State = {
  data: null,
  error: null,
  loading: true,
  status: { status: 0, isCanceled: false }
};

const initialOptions = {
  dependencies: [],
  conditions: true,
  onSuccess: () => null,
  onError: () => null
};

const reducer = (state: any, action: Action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: action.loading };
    case SET_DATA:
      return { ...state, data: action.data };
    case SET_ERROR:
      return { ...state, error: action.error };
    case SET_STATUS:
      return { ...state, status: action.status };
  }
};

function useFetch<T>(
  asyncApiCall: (...options: any) => Promise<[any | null, null | ErrorResponse, Status]>,
  { dependencies = [], conditions = true, onSuccess = () => null, onError = () => null }: Options<T> = initialOptions
): UseFetchReturnData<T> {
  const componentIsMounted = useRef(true);

  const handleComponentMount = () => {
    componentIsMounted.current = true;
  };
  const handleWillComponentUnmount = () => {
    componentIsMounted.current = false;
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const actions: Actions = {
    setLoading: (loading) => dispatch({ type: SET_LOADING, loading }),
    setData: (data) => dispatch({ type: SET_DATA, data }),
    setError: (error) => dispatch({ type: SET_ERROR, error }),
    setStatus: (status) => dispatch({ type: SET_STATUS, status })
  };

  const handleFetch = async () => {
    const { setLoading, setData, setError, setStatus } = actions;

    setLoading(true);
    setError(null);

    if (conditions) {
      const [data, error, { status, isCanceled }] = await asyncApiCall();

      if (!componentIsMounted.current) {
        return;
      }
      if (error && !isCanceled && status !== 0) {
        setError(error);
        onError && onError(error);
        setStatus({ status, isCanceled });
        setLoading(false);
      }
      if (!isCanceled) {
        setData(data);
        onSuccess && onSuccess(data);
        setStatus({ status, isCanceled });
        setLoading(false);
      }
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
    status: state.status,
    actions,
    refresh: handleFetch
  };
}

export default useFetch;
