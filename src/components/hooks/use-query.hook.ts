import { useLocation, useHistory } from 'react-router-dom';
import queryString from 'query-string';

type QueryParam = string | number;

type QueryParams = {
  [key: string]: QueryParam;
};

export type QueryReturn = {
  query: QueryParams;
  search: string;
  setQuery: (key: string, value: QueryParam) => void;
  setQueries: (value: QueryParams) => void;
  removeQuery: (key: string) => void;
  resetQueries: () => void;
};

const options = {
  skipNull: true,
  skipEmptyString: true
};

const useQuery = (): QueryReturn => {
  const history = useHistory();
  const location = useLocation();

  const { search } = location;
  const query = queryString.parse(search) as { [key: string]: any };

  const setQuery = (key: string, value: QueryParam) => {
    const prevQuery = { ...query };
    prevQuery[key] = value;

    const queries = queryString.stringify(prevQuery, options);

    history.replace({ search: queries });
  };

  const setQueries = (value: QueryParams) => {
    const queries = queryString.stringify(value, options);

    history.replace({ search: queries });
  };

  const removeQuery = (key: string) => {
    const prevQuery = { ...query };
    delete prevQuery[key];

    const queries = queryString.stringify(prevQuery, options);
    history.replace({ search: queries });
  };

  const resetQueries = () => {
    const queries = queryString.stringify({}, options);

    history.replace({ search: queries });
  };

  return {
    query,
    search,
    setQuery,
    setQueries,
    removeQuery,
    resetQueries
  };
};

export default useQuery;
