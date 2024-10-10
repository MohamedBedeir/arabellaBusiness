import {createAsyncThunk} from '@reduxjs/toolkit';
import {setAuthenticationLoader, setLoginState} from '../../redux/store/auth/authenticationSlice';
import {client} from '../../network/apiClient';
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
        phoneNumber: args.phone,
        password: args.password,
        // isCustomer: false,
      };
      const response: any = await client.post(endpoints.login, data);
      console.log('response----login------', response);
      
      if (response.status == 204) {
        thunkApi.dispatch(setAuthenticationLoader(false));
        thunkApi.dispatch(setLoginState(''));
        args.navigation.navigate('VerficationOTP', { phone: args.phone });
      } else {
        thunkApi.dispatch(setAuthenticationLoader(false));
        thunkApi.dispatch(setLoginState('error'));
      }
    } catch (err) {
      thunkApi.dispatch(setLoginState('error'));
      thunkApi.dispatch(setAuthenticationLoader(false));
    }
  },
);