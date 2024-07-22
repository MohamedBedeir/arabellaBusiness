import {AxiosRequestConfig, AxiosRequestHeaders} from 'axios';
import {api} from './networkInstance.config';
import {client, clientFormData} from './apiClient';

const post = (url: string, data: unknown) =>
  api.post(url, JSON.stringify(data));

const put = (url: string, data: unknown, headers?: AxiosRequestHeaders) =>
  api.put(url, JSON.stringify(data), {
    headers: {...headers},
});

const get = (
  url: string,
  params?: AxiosRequestConfig<unknown>,
  headers?: AxiosRequestHeaders,
) => {
  return api.get(url, {
    params,
    headers: {...headers},
  });
};
const postFormData = (
  url: string,
  data: unknown,
  headers?: AxiosRequestHeaders,
) =>
  api.post(url, data, {
    headers: {
      ...headers,
      'Content-Type': 'multipart/form-data',
    },
  });

const putFormData = (
  url: string,
  data: unknown,
  headers?: AxiosRequestHeaders,
) =>
  api.put(url, data, {
    headers: {
      ...headers,
      'Content-Type': 'multipart/form-data',
    },
  });
const init_token = (access_token: string) => {
  console.log('access_token ===> ', access_token);
  if (access_token) {
    client.setHeaders({
      Authorization: `${access_token}`,
    });
    clientFormData.setHeaders({
      Authorization: `${access_token}`,
    });
  }
};
const init_lang = (lang: string) => {
  if (lang) {
    client.setHeaders({
      lang: lang,
    });
    clientFormData.setHeaders({
      lang: lang,
    });
  }
};
export {
  get,
  post,
  put,
  postFormData,
  putFormData,
  init_token,
  init_lang,
};
