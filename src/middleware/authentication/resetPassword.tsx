import {createAsyncThunk} from '@reduxjs/toolkit';
import {setAuthenticationLoader, setResetPasswordState} from '../../redux/store/auth/authenticationSlice';
import {client} from '../../network/apiClient';
import endpoints from '../../network/endpoints';

interface ResetPasswor {
  navigation: any;
  phone: string;
  otp: string;
  newPassword: string;
  confirmNewPassword: string;
};

export const resetPassword = createAsyncThunk(
  'RESET_PASSWORD',
  async (args: ResetPasswor, thunkApi) => {
    thunkApi.dispatch(setAuthenticationLoader(true));
    thunkApi.dispatch(setResetPasswordState(''));
    try {
      const data = {
        phoneNumber: args?.phone,
        otp: args?.otp,
        newPassword: args?.newPassword,
        confirmNewPassword: args?.confirmNewPassword,
      };
      const response: any = await client.post(endpoints.reset_password, data);
      if (response.status == 204) {
        thunkApi.dispatch(setAuthenticationLoader(false));
        thunkApi.dispatch(setResetPasswordState('done'));
      } else {
        thunkApi.dispatch(setAuthenticationLoader(false));
        thunkApi.dispatch(setResetPasswordState('error'));
      };
    } catch (err) {
      thunkApi.dispatch(setAuthenticationLoader(false));
      thunkApi.dispatch(setResetPasswordState('done'));
    };
  },
);