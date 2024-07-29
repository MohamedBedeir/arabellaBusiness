import {createAsyncThunk} from '@reduxjs/toolkit';
import {init_lang, init_token} from '../../network';
import endpoints from '../../network/endpoints';
import {setAuthenticationLoader, setConfirmationCodeState} from '../../redux/store/auth/authenticationSlice';
import {client} from '../../network/apiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ConfirmationCodeArgs {
  navigation?: any;
  phone?: string;
  otp?: string;
  form?: string;
};

export const confirmationCode = createAsyncThunk(
  'CONVERMATION_CODE',
  async (args: ConfirmationCodeArgs, thunkApi) => {
    thunkApi.dispatch(setAuthenticationLoader(true));
    thunkApi.dispatch(setConfirmationCodeState(''));
    try {
      const data: any = {
        phoneNumber: args?.phone,
        otp: args?.otp,
      };
      const response: any = await client.post(`${endpoints.verifyOTP}`, data);
      console.log('response----confirmationCode------', response);
      thunkApi.dispatch(setAuthenticationLoader(false));
      if (response.status == 201) {
        thunkApi.dispatch(setConfirmationCodeState('done'));
        await AsyncStorage.setItem('user', JSON.stringify(response.data.data.user));
        await AsyncStorage.setItem('token', `Bearer ${response.data.data.token}`);
        init_token(`Bearer ${response.data.data.token}`);
        args.navigation.navigate('MA_Tabs');
      } else {
        thunkApi.dispatch(setConfirmationCodeState('error'));
      }
    } catch (err) {
      thunkApi.dispatch(setAuthenticationLoader(false));
      thunkApi.dispatch(setConfirmationCodeState('error'));
    }
  },
);