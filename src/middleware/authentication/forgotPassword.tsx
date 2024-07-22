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
        phone: args.phone,
    };
      const response: any = await client.post(endpoints.forgot_password, data);
      console.log('response--forgotPassword----', response.data);
      thunkApi.dispatch(setAuthenticationLoader(false));
      if (!response.data.error) {
        thunkApi.dispatch(setForgotPasswordState('done'));
        args.navigation.navigate('ConfirmationCode', {whereFrom: 'forgotPassword', id: response.data.client.id, confirmation_code: response.data.client.confirmation_code});
      } else {
        thunkApi.dispatch(setForgotPasswordState('error'));
      }
    } catch (err) {
      thunkApi.dispatch(setForgotPasswordState('error'));
      thunkApi.dispatch(setAuthenticationLoader(false));
    }
  },
);