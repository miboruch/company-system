import { useEffect, useRef } from 'react';
import memoizee from 'memoizee';
import { FormikHelpers } from 'formik';

import { ErrorResponse, Status } from 'api/api.middleware';

type Unwrap<T> = T extends (...args: any) => () => Promise<infer U> ? U : T extends (...args: any) => Promise<infer U> ? U : T;

type SuccessCallback<T, V> = (
  // @ts-ignore
  callback: (payload: NonNullable<Unwrap<T>>[0], values: V) => void,
  dependencies?: any[]
) => void;

type ErrorCallback = (callback: (error: NonNullable<ErrorResponse>) => void, dependencies?: any[]) => void;
type MapData<V> = (callback: (data: V) => void, dependencies?: any[]) => void;

interface Options<T, Values> {
  // @ts-ignore
  onSubmitSuccess?: (payload: NonNullable<Unwrap<T>>[0], values: Values) => void;
  onSubmitError?: (error: NonNullable<ErrorResponse>, values: Values) => void;
  onMapData?: (values: Values) => void;
}

const memoizeOptions = {
  normalizer: (args: any) => JSON.stringify(args[1])
};

function useSubmit<T, Values>(asyncApiCall: (...options: any) => Promise<[any | null, ErrorResponse | null, Status]>) {
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

  const onSuccess = useRef<Options<T, Values>['onSubmitSuccess'] | null>(null);
  const onError = useRef<Options<T, Values>['onSubmitError'] | null>(null);
  const onMapData = useRef<Options<T, Values>['onMapData'] | null>(null);

  const getMapData = (data: Values) => {
    if (onMapData.current) {
      onMapData.current(data);
    }
    return data;
  };

  const sendSubmit = async (values: Values, { resetForm, setSubmitting }: FormikHelpers<Values>) => {
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

  const handleSuccess = memoizee((submitSuccess: Options<T, Values>['onSubmitSuccess']) => {
    onSuccess.current = submitSuccess;
  }, memoizeOptions);

  const handleError = memoizee((submitError: Options<T, Values>['onSubmitError']) => {
    onError.current = submitError;
  }, memoizeOptions);

  const mapData = memoizee((mapDataCallback: Options<T, Values>['onMapData']) => {
    onMapData.current = mapDataCallback;
  });

  return {
    onSubmitSuccess: handleSuccess as SuccessCallback<T, Values>,
    onSubmitError: handleError as ErrorCallback,
    onSubmit: sendSubmit,
    mapData: mapData as MapData<Values>
  };
}

export default useSubmit;
