import { useEffect, useRef } from 'react';
import memoizee from 'memoizee';
import { FormikHelpers } from 'formik';

import { ErrorResponse, Status } from 'api/api.middleware';

type ApiCall = (...args: any) => Promise<[any | null, ErrorResponse | null, Status]>;
type ApiCallArguments<T> = T extends (arg: infer A) => any ? A : never;
type ApiCallReturnType = ReturnType<ApiCall>;

type ResolvedPromise<T extends ApiCallReturnType> = T extends Promise<[infer R, ErrorResponse | null, Status]> ? R : never;

type ErrorCallback = (callback: (error: NonNullable<ErrorResponse>) => void, dependencies?: any[]) => void;
type MapData<Values> = (callback: (data: Values) => void, dependencies?: any[]) => void;
type SuccessCallback<T extends ApiCall> = (
  callback: (payload: NonNullable<ResolvedPromise<ReturnType<T>>>, values: ApiCallArguments<T>) => void,
  dependencies?: any[]
) => void;

interface Options<T> {
  onSubmitSuccess?: (payload: NonNullable<ResolvedPromise<ApiCallReturnType>>, values: ApiCallArguments<T>) => void;
  onSubmitError?: (error: NonNullable<ErrorResponse>, values: ApiCallArguments<T>) => void;
  onMapData?: (values: ApiCallArguments<T>) => void;
}

interface ReturnHookTypes<T extends ApiCall> {
  onSubmitSuccess: SuccessCallback<T>;
  onSubmitError: ErrorCallback;
  onSubmit: (...args: any) => Promise<void>;
  mapData: MapData<ApiCallArguments<T>>;
}

const memoizeOptions = {
  normalizer: (args: any) => JSON.stringify(args[1])
};

function useSubmit<T extends ApiCall>(asyncApiCall: T): ReturnHookTypes<T> {
  const isComponentMounted = useRef(true);

  const handleComponentMount = () => {
    isComponentMounted.current = true;
  };
  const handleWillComponentUnmount = () => {
    isComponentMounted.current = false;
  };

  useEffect(() => {
    handleComponentMount();

    return () => handleWillComponentUnmount();
  }, []);

  const onSuccess = useRef<Options<T>['onSubmitSuccess'] | null>(null);
  const onError = useRef<Options<T>['onSubmitError'] | null>(null);
  const onMapData = useRef<Options<T>['onMapData'] | null>(null);

  const getMapData = (data: ApiCallArguments<T>) => {
    if (onMapData.current) {
      onMapData.current(data);
    }
    return data;
  };

  const sendSubmit = async (values: ApiCallArguments<T>, { resetForm, setSubmitting }: FormikHelpers<ApiCallArguments<T>>) => {
    const data = getMapData(values);
    const [payload, error] = await asyncApiCall(data);

    if (!isComponentMounted.current) {
      return;
    }
    if (payload) {
      setSubmitting(false);
      onSuccess.current && onSuccess.current(payload, values);
      resetForm();
    }
    if (error) {
      setSubmitting(false);
      onError.current && onError.current(error, values);
    }
  };

  const handleSuccess = memoizee((submitSuccess: Options<T>['onSubmitSuccess']) => {
    onSuccess.current = submitSuccess;
  }, memoizeOptions);

  const handleError = memoizee((submitError: Options<T>['onSubmitError']) => {
    onError.current = submitError;
  }, memoizeOptions);

  const mapData = memoizee((mapDataCallback: Options<T>['onMapData']) => {
    onMapData.current = mapDataCallback;
  });

  return {
    onSubmitSuccess: handleSuccess as SuccessCallback<T>,
    onSubmitError: handleError as ErrorCallback,
    onSubmit: sendSubmit,
    mapData: mapData as MapData<ApiCallArguments<T>>
  };
}

export default useSubmit;
