import axios, { AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';

export const serviceBase = (
  baseURL: string,
  headers?: Record<string, unknown>,
) => {
  const request = axios.create({
    baseURL,
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
  });

  const makeHeaders = (
    headers?: RawAxiosRequestHeaders,
  ): AxiosRequestConfig => ({ ...(headers && { headers }) });

  return {
    get: <T>(path: string, headers?: RawAxiosRequestHeaders) =>
      request.get<T>(path, makeHeaders(headers)),
    post: <T>(
      path: string,
      data?: AxiosRequestConfig['data'],
      headers?: RawAxiosRequestHeaders,
    ) => request.post<T>(path, data, makeHeaders(headers)),
    patch: <T>(
      path: string,
      data?: AxiosRequestConfig['data'],
      headers?: RawAxiosRequestHeaders,
    ) => request.patch<T>(path, data, makeHeaders(headers)),
    put: <T>(
      path: string,
      data?: AxiosRequestConfig['data'],
      headers?: RawAxiosRequestHeaders,
    ) => request.put<T>(path, data, makeHeaders(headers)),
    delete: <T>(path: string, headers?: RawAxiosRequestHeaders) =>
      request.delete<T>(path, makeHeaders(headers)),
  };
};
