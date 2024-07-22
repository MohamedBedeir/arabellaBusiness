import {createAsyncThunk} from '@reduxjs/toolkit';
import endpoints from '../../network/endpoints';
import {client} from '../../network/apiClient';
import { setUserDataLoader, setUserDataState } from '../../redux/store/profile/profile';
import { userData } from '../profile/profile';

interface ResetPassworArgs {
  navigation: any;
  old_password: string;
  password: string;
  password_confirmation: string;
};

export const updatePassword = createAsyncThunk(
  'RESET_PASSWORD',
  async (args: ResetPassworArgs, thunkApi) => {
    thunkApi.dispatch(setUserDataLoader(true));
        thunkApi.dispatch(setUserDataState(''));
    try {
      const data = {
        old_password: args.old_password,
        password: args.password,
        password_confirmation: args.password_confirmation,
      };
      const response: any = await client.put(endpoints.update_password, data);
      thunkApi.dispatch(userData({}))
    } catch (err) {
      thunkApi.dispatch(setUserDataLoader(false));
      thunkApi.dispatch(setUserDataState('error'));
      console.log(err);
    }
  },
);