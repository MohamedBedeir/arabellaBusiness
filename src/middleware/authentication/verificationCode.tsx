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
        const user: any = response.data.data.user;
        await AsyncStorage.setItem('user', JSON.stringify(user));
        await AsyncStorage.setItem('token', `Bearer ${response.data.data.token}`);
        init_token(`Bearer ${response.data.data.token}`);
        console.log('user-------------------', user);
        if (user.type == 'super_admin' || user.type == 'admin') {
          args.navigation.navigate('AD_Tabs');
        } else if (user.type == 'salon_admin') {
          args.navigation.navigate('SA_Tabs');
        } else if (user.type == 'makeup_artist') {
          args.navigation.navigate('MA_Tabs');
        } else if (user.type == 'home_service_provider') {
          args.navigation.navigate('HS_Tabs');
        };
      } else {
        thunkApi.dispatch(setConfirmationCodeState('error'));
      }
    } catch (err) {
      thunkApi.dispatch(setAuthenticationLoader(false));
      thunkApi.dispatch(setConfirmationCodeState('error'));
    }
  },
);