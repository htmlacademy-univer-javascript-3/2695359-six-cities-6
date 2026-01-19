import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { TOKEN_KEY } from '../const';

const BASE_URL = 'https://14.design.htmlacademy.pro/six-cities';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = localStorage.getItem(TOKEN_KEY);

    if (token && config.headers) {
      config.headers['X-Token'] = token;
    }

    return config;
  });

  return api;
};
