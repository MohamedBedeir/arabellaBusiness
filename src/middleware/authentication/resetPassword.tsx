import {createAsyncThunk} from '@reduxjs/toolkit';
import {setAuthenticationLoader, setResetPasswordState} from '../../redux/store/auth/authenticationSlice';
import {client} from '../../network/apiClient';
import endpoints from '../../network/endpoints';

interface ResetPassworArgs {
  navigation: any;
  id: string;
  password: string;
  password_confirmation: string;
};


export const resetPassword = createAsyncThunk(
  'RESET_PASSWORD',
  async (args: ResetPassworArgs, thunkApi) => {
    thunkApi.dispatch(setAuthenticationLoader(true));
    thunkApi.dispatch(setResetPasswordState(''));
    try {
      const data = {
        id: args.id,
        password: args.password,
        password_confirmation: args.password_confirmation,
      };
      const response: any = await client.post(endpoints.reset_password, data);
      thunkApi.dispatch(setAuthenticationLoader(false));
      if (!response.data.error) {
        args.navigation.navigate('Login');
        thunkApi.dispatch(setResetPasswordState('done'));
      } else {
        thunkApi.dispatch(setResetPasswordState('error'));
      }
    } catch (err) {
      thunkApi.dispatch(setAuthenticationLoader(false));
      thunkApi.dispatch(setResetPasswordState('error'));
    }
  },
);