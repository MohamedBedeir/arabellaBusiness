import {createAsyncThunk} from '@reduxjs/toolkit';
import {client, clientFormData} from '../../network/apiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUpgradeDataLoader, setUpgradeDataState, setUserDataLoader, setUserDataState } from '../../redux/store/profile/profile';
import endpoints from '../../network/endpoints';

export const userData = createAsyncThunk(
  'USER_DATA',
  async (args: any, thunkApi) => {
    try {
        const response: any = await client.get(endpoints.user_data);
        if (response.data.client) {
            await AsyncStorage.setItem('user', JSON.stringify(response.data.client));
            // thunkApi.dispatch(setUserDataState('done'));
            thunkApi.dispatch(setUserDataLoader(false));
        }
    } catch (err) {
        console.log(err);
    }
  },
);

export const updateUserData = createAsyncThunk(
    'UPDATE_USER_DATA',
    async (args: any, thunkApi) => {
        thunkApi.dispatch(setUserDataLoader(true));
        thunkApi.dispatch(setUserDataState(''));
        try {
            const response: any = await client.put(endpoints.update_user_data, args);
            console.log('response-----updateUserData-----', response);
            thunkApi.dispatch(userData({}))
        } catch (err) {
            thunkApi.dispatch(setUserDataLoader(false));
            thunkApi.dispatch(setUserDataState('error'));
            console.log(err);
        }
    },
);

export const upgradedUserData = createAsyncThunk(
    'UPDATE_USER_DATA',
    async (args: any, thunkApi) => {
        thunkApi.dispatch(setUpgradeDataLoader(true));
        thunkApi.dispatch(setUpgradeDataState(''));
        try {
            const response: any = await clientFormData.post(endpoints.upgraded_user_data, args.data);
            console.log('response------upgradedUserData----', response);
            thunkApi.dispatch(setUpgradeDataLoader(false));
            thunkApi.dispatch(setUpgradeDataState('done'));
            thunkApi.dispatch(userData({}))
        } catch (err) {
            thunkApi.dispatch(setUpgradeDataLoader(false));
            thunkApi.dispatch(setUpgradeDataState('error'));
            console.log(err);
        }
    },
);
