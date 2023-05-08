import axios from 'axios';
import queryString from 'query-string';

const AxiosClient = axios.create({
  baseURL: 'http://10.35.4.18:8000/v1/',
  responseType: 'json',
  timeout: 5000,
  paramsSerializer: params => queryString.stringify(params),
});

AxiosClient.interceptors.request.use(
  async config => {
    const newConfig = config;
    return newConfig;
  },
  error => {
    return Promise.reject(error);
  },
);

export default AxiosClient;
