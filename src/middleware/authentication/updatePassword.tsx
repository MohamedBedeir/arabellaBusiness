import {createAsyncThunk} from '@reduxjs/toolkit';
import endpoints from '../../network/endpoints';
import {client} from '../../network/apiClient';
import { setPasswordUpdateState, setProfileLoader, setProfileUpdateState } from '../../redux/store/profile/profileSlice';

interface PassworUpdate {
  currentPassword: string;
  password: string;
  confirmPassword: string;
};

export const password_update = createAsyncThunk(
  'PASSWORD_UPDATE',
  async (args: PassworUpdate, thunkApi) => {
    thunkApi.dispatch(setPasswordUpdateState(''));
    thunkApi.dispatch(setProfileLoader(true));
    try {
      const data = {
        currentPassword: args.currentPassword,
        password: args.password,
        confirmPassword: args.confirmPassword,
      };
      const response: any = await client.patch(`${endpoints.profiles}/password`, data);
      if (response.status == 200 || response.status == 201 || response.status == 204) {
        thunkApi.dispatch(setPasswordUpdateState('done'));
        thunkApi.dispatch(setProfileLoader(false));
      } else {
        thunkApi.dispatch(setPasswordUpdateState('error'));
        thunkApi.dispatch(setProfileLoader(false));
      }
    } catch (err) {
      thunkApi.dispatch(setPasswordUpdateState('error'));
      thunkApi.dispatch(setProfileLoader(false));
    }
  },
);