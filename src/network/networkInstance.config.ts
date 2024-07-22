import axios, {AxiosInstance} from 'axios';
import endpoints from './endpoints';

const config = {
  api: {
    baseURL: endpoints.baseUrl,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  },
};

export const api: AxiosInstance = axios.create({...config.api});
