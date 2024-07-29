import {createAsyncThunk} from '@reduxjs/toolkit';
import endpoints from '../../network/endpoints';
import {setAuthenticationLoader, setForgotPasswordState} from '../../redux/store/auth/authenticationSlice';
import {client} from '../../network/apiClient';

interface ForgotPasswordArgs {
  navigation: any;
  phone: string;
};

export const forgotPassword = createAsyncThunk(
  'FORGOT_PASSWORD',
  async (args: ForgotPasswordArgs, thunkApi) => {
    thunkApi.dispatch(setAuthenticationLoader(true));
    thunkApi.dispatch(setForgotPasswordState(''));
    try {
      const data = {
        phoneNumber: args.phone,
      };
      const response: any = await client.post(endpoints.forgot_password, data);
      console.log('response--forgotPassword----', response);
      if (response.status == 204) {
        thunkApi.dispatch(setAuthenticationLoader(false));
        thunkApi.dispatch(setForgotPasswordState('done'));
        args.navigation.navigate('ResetPassword', { phone: args.phone })
      } else {
        thunkApi.dispatch(setForgotPasswordState('error'));
      };
    } catch (err) {
      thunkApi.dispatch(setForgotPasswordState('error'));
      thunkApi.dispatch(setAuthenticationLoader(false));
    }
  },
);