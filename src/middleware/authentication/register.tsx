import { createAsyncThunk } from '@reduxjs/toolkit';
import { setAuthenticationLoader, setRegisterError, setRegisterState } from '../../redux/store/auth/authenticationSlice';
import endpoints from '../../network/endpoints';
import {client, clientFormData} from '../../network/apiClient';
// import { saveFcmToken } from '../notifications/notifications';

interface RegisterArgs {
    navigation: any;
    username: string;
    phone: string;
    password: string;
    password_confirmation: string;
};

export const register = createAsyncThunk(
    'REGISTER',
    async (args: RegisterArgs | any, thunkApi) => {
        thunkApi.dispatch(setAuthenticationLoader(true));
        thunkApi.dispatch(setRegisterState(''));
        try {
            const response: any = await clientFormData.post(endpoints.register, args.data);
            console.log('response-------register------------', response);
            thunkApi.dispatch(setAuthenticationLoader(false));
            if (response.data.error) {
                thunkApi.dispatch(setRegisterError(response.data.errors));
                thunkApi.dispatch(setRegisterState('error'));
            } else {
                thunkApi.dispatch(setRegisterState('done'));
                args.navigation.navigate('ConfirmationCode', {whereFrom: 'register', id: response.data.client.id, confirmation_code: response.data.client.confirmation_code});
                // thunkApi.dispatch(saveFcmToken({}));
            }
        } catch (err) {
            thunkApi.dispatch(setRegisterState('error'));
            thunkApi.dispatch(setAuthenticationLoader(false));
        }
    },
);
