import {createAsyncThunk} from '@reduxjs/toolkit';
import {init_lang, init_token} from '../../network';
import {setAuthenticationLoader, setLoginState} from '../../redux/store/auth/authenticationSlice';
import {client} from '../../network/apiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { saveFcmToken } from '../notifications/notifications';
import endpoints from '../../network/endpoints';

interface LoginArgs {
  navigation: any;
  phone: string;
  password: string;
};

export const login = createAsyncThunk(
  'LOGIN',
  async (args: LoginArgs, thunkApi) => {
    thunkApi.dispatch(setAuthenticationLoader(true));
    thunkApi.dispatch(setLoginState(''));
    try {
      const data: any = {
        identifier: args.phone,
        password: args.password,
      };
      const response: any = await client.post(endpoints.login, data);
      thunkApi.dispatch(setAuthenticationLoader(false));
      if (!response.data.error) {
        thunkApi.dispatch(setLoginState('done'));
        // await AsyncStorage.setItem('user', JSON.stringify(response.data.client));
        // init_token(`Bearer ${response.data.client.access_token}`);
        // thunkApi.dispatch(saveFcmToken({}));
        // init_lang();
        args.navigation.navigate('VerficationOTP', { phone: args.phone })
      } else {
        thunkApi.dispatch(setLoginState('error'));
      }
    } catch (err) {
      thunkApi.dispatch(setLoginState('error'));
      thunkApi.dispatch(setAuthenticationLoader(false));
    }
  },
);