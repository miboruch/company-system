import { ErrorResponse, Status } from 'api/api.middleware';
import { isEmptyObject } from 'utils/functions';

interface ShowContentProps {
  loading: boolean;
  payload: any;
  error: ErrorResponse | null;
  status: Status;
}

export interface ShowContentReturnInterface {
  showLoader: boolean;
  showContent: boolean;
  showNoContent: boolean;
  showError: boolean;
}

const useShowContent = ({ loading, payload, error, status }: ShowContentProps): ShowContentReturnInterface => {
  const checkPayload = (): boolean => {
    if (payload) {
      if (Array.isArray(payload)) {
        return Boolean(payload.length);
      }
      return !isEmptyObject(payload);
    }

    return false;
  };

  const hasPayload = checkPayload();

  const showLoader = loading;
  const showContent = hasPayload && !loading && !error;
  const showNoContent = !hasPayload && !loading && !error;
  const showError = !!error && !hasPayload && !loading && !status?.isCanceled;

  return {
    showLoader,
    showContent,
    showNoContent,
    showError
  };
};

export default useShowContent;
