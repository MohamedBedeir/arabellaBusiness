import { createAsyncThunk } from '@reduxjs/toolkit';
import endpoints from '../../network/endpoints';
import { client } from '../../network/apiClient';
import { setNotificationsLoader, setNotificationsDeleteState, setNotificationsData } from '../../redux/store/notifications/notificationsSlice';

export const notifications_data = createAsyncThunk(
    'NOTIFICATIONS_DATA',
    async (args: any, thunkApi) => {
        thunkApi.dispatch(setNotificationsLoader(true));
        try {
            const response: any = await client.get(endpoints.notifications);
            console.log('response---------notifications_data-------', response);
            
            thunkApi.dispatch(setNotificationsLoader(false));
            if (response.status == 200 || response.status == 201) {
                thunkApi.dispatch(setNotificationsLoader(false));
                thunkApi.dispatch(setNotificationsData(response.data.data));
            } else {
                thunkApi.dispatch(setNotificationsLoader(false));
            };
        } catch (err) {
            thunkApi.dispatch(setNotificationsLoader(false));
        };
    },
);

export const notifications_delete = createAsyncThunk(
    'NOTIFICATIONS_DELETE',
    async (args: any, thunkApi) => {
        thunkApi.dispatch(setNotificationsDeleteState(''));
        thunkApi.dispatch(setNotificationsLoader(true));
        try {
            const response: any = await client.delete(endpoints.notifications);
            if (response.status == 200 || response.status == 201) {
                thunkApi.dispatch(notifications_data({}));
                thunkApi.dispatch(setNotificationsDeleteState('done'));
                // thunkApi.dispatch(setNotificationsLoader(false));
            } else {
                thunkApi.dispatch(setNotificationsDeleteState('error'));
                thunkApi.dispatch(setNotificationsLoader(false));
            }
        } catch (err) {
            thunkApi.dispatch(setNotificationsDeleteState('error'));
            thunkApi.dispatch(setNotificationsLoader(false));
        }
    },
);

