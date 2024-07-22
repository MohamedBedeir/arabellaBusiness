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
};

export const confirmationCode = createAsyncThunk(
  'CONVERMATION_CODE',
  async (args: ConfirmationCodeArgs, thunkApi) => {
    // thunkApi.dispatch(setAuthenticationLoader(true));
    // thunkApi.dispatch(setConfirmationCodeState(''));
    try {
      // thunkApi.dispatch(setAuthenticationLoader(false));
      const data: any = {
        phone: args?.phone,
        otp: args?.otp,
      };
      console.log('data----------', data);
      const response = await client.post(`${endpoints.verifyOTP}`, data);
      console.log('response----------', response.data);
      // if (!response.data.error) {
      //   thunkApi.dispatch(setConfirmationCodeState('done'));
      //   await AsyncStorage.setItem('user', JSON.stringify(response.data.client));
      //   init_token(`Bearer ${response.data.client.access_token}`);
      //   // init_lang();
      //   if (args.whereFrom == 'register') {
      //     args.navigation.navigate('MainStack')
      //   } else if (args.whereFrom == 'forgotPassword') {
      //     args.navigation.navigate('ResetPassword', {id: response.data.client.id, confirmation_code: response.data.client.confirmation_code});
      //   }
      // } else {
      //   thunkApi.dispatch(setConfirmationCodeState('error'));
      // }
    } catch (err) {
      // thunkApi.dispatch(setConfirmationCodeState('error'));
      // thunkApi.dispatch(setAuthenticationLoader(false));
    }
  },
);