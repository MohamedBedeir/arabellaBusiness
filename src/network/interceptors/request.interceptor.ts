import AsyncStorage from '@react-native-async-storage/async-storage';
import {api} from '../networkInstance.config';

api.interceptors.request.use(
  async (conf: any) => {
    const user: any = await AsyncStorage.getItem('user');
    if (user.access_token) {
      conf.headers.Authorization = 'Bearer ' + user.access_token;
    }
    conf.headers = {
      ...conf.headers,
    };
    return conf;
  },
  (err: any) => {
    return err?.response;
  },
);
