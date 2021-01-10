import memoizee from 'memoizee';
import { ErrorResponse, Status } from 'api/api.middleware';
import { useRef } from 'react';
import { FormikHelpers } from 'formik';

type Unwrap<T> = T extends (...args: any) => () => Promise<infer U> ? U : T extends (...args: any) => Promise<infer U> ? U : T;
//TODO: try to extract value from array without ts-ignore

type SuccessCallback<T, Values> = (
  // @ts-ignore
  callback: (payload: NonNullable<Unwrap<T>>[0], values: Values) => void,
  dependencies?: any[]
) => void;

type ErrorCallback = (callback: (error: NonNullable<ErrorResponse>) => void, dependencies?: any[]) => void;

type ArgumentType<T> = T extends (...args: infer A) => any ? A : never;

interface Options<T, Values> {
  // @ts-ignore
  onSubmitSuccess?: (payload: NonNullable<Unwrap<T>>[0], values: Values) => void;
  onSubmitError?: (error: NonNullable<ErrorResponse>, values: Values) => void;
}

const memoizeOptions = {
  normalizer: (args: any) => JSON.stringify(args[1])
};

function useSubmit<T, Values>(asyncApiCall: (...options: any) => Promise<[any | null, ErrorResponse | null, Status]>) {
  const isComponentMounted = useRef(true);
  const onSuccess = useRef<Options<T, Values>['onSubmitSuccess'] | null>(null);
  const onError = useRef<Options<T, Values>['onSubmitError'] | null>(null);

  const sendSubmit = async (values: Values, { resetForm, setSubmitting }: FormikHelpers<Values>) => {
    const [payload, error] = await asyncApiCall(values);

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

  return {
    onSubmitSuccess: handleSuccess as SuccessCallback<T, Values>,
    onSubmitError: handleError as ErrorCallback,
    onSubmit: sendSubmit
  };
}

export default useSubmit;
