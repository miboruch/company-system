import axios from 'axios';
import { API_URL } from 'utils/config';

export interface ParamsProps {
  headers?: HeadersInit;
  url: string;
  method: 'post' | 'patch' | 'put' | 'delete' | 'get';
  data?: any;
  canceling?: boolean;
  baseUrl?: string;
}

export interface Status {
  isCanceled: boolean;
  status: number;
}

export interface ErrorResponse {
  message: string;
  detail?: string;
  title?: string;
  response?: any;
  request?: any;
}

type AbortControllersType = {
  [key: string]: any;
};

const { CancelToken } = axios;
const abortControllers: AbortControllersType = {};
const cancelMessage = 'Request has been canceled';

async function fetchMiddleware<T>(params: ParamsProps): Promise<[T | null, ErrorResponse | null, Status]> {
  return new Promise((resolve) => {
    const base = params.baseUrl || API_URL;
    const url = base + params.url;
    const isFormData = params.data instanceof FormData;

    const headers: HeadersInit = handleHeaders(params, isFormData);
    const cancelToken = handleCancelRequest(params);
    const data = handlePrepareData(params.data, isFormData);

    return axios({
      ...params,
      url,
      data,
      headers,
      cancelToken
    })
      .then(({ data, status }: any) => {
        return resolve([data, null, { status, isCanceled: false }]);
      })
      .catch((err: ErrorResponse) => {
        const status = handleStatus(err);
        const error = handleErrors(err.response?.data || err);
        const isCanceled = err.message === cancelMessage;

        return resolve([null, error, { status, isCanceled }]);
      });
  });
}

export default fetchMiddleware;

const handlePrepareData = (payload: any, isFormData: boolean) => {
  let data = undefined;
  if (isFormData) {
    data = payload;
  } else if (payload) {
    data = JSON.stringify(payload);
  }
  return data;
};

const handleHeaders = (params: ParamsProps, isFormData: boolean) => {
  const headers: HeadersInit = {};

  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  Object.assign(headers, params.headers);

  return headers;
};

const handleCancelRequest = ({ baseUrl, url }: ParamsProps) => {
  const abortName = baseUrl ? baseUrl + url.split('?')[0] : API_URL + url.split('?')[0];

  if (!abortControllers[abortName]) {
    abortControllers[abortName] = CancelToken.source();
  } else {
    abortControllers[abortName].cancel('Request has been canceled');
    delete abortControllers[abortName];
  }

  const abortToken = abortControllers[abortName];

  return abortToken?.token;
};

const handleErrors = (error: ErrorResponse): Error | ErrorResponse => {
  return error.message === cancelMessage ? new Error('Request canceled') : error;
};

const handleStatus = ({ response, request }: ErrorResponse) => {
  if (response) {
    return response?.status;
  } else if (request) {
    return request?.status;
  }

  return 0;
};
