import { ErrorResponse, Status } from 'api/api.middleware';

interface ShowContentProps {
  loading: boolean;
  payload: any;
  error: ErrorResponse | null;
  status: Status;
}

interface ShowContentReturnInterface {
  showLoader: boolean;
  showContent: boolean;
  showNoContent: boolean;
  showError: boolean;
}

const useShowContent = ({ loading, payload, error, status }: ShowContentProps): ShowContentReturnInterface => {
  const showLoader = loading;
  const showContent = payload && !error;
  const showNoContent = !payload && !loading && !error;
  const showError = !!error && !payload && !loading && !status.isCanceled;

  return {
    showLoader,
    showContent,
    showNoContent,
    showError
  };
};

export default useShowContent;
