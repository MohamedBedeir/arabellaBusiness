import { createAsyncThunk } from '@reduxjs/toolkit';
import endpoints from '../../../network/endpoints';
import { client } from '../../../network/apiClient';
import { setAppointmentsUpcomingLoader, setAppointmentsUpcomingCount, setAppointmentsUpcomingData, setAppointmentsUpcomingData_More, setAppointmentsUpcomingUpdateState } from '../../../redux/store/appointments_upcoming/appointments_upcomingSlice';

interface UpcomingData {
    page: number;
};
interface UpcomingUpdate {
    id: number;
    data: any;
};

export const upcoming_data = createAsyncThunk(
    'UPCOMING_DATA',
    async (args: UpcomingData, thunkApi) => {
        thunkApi.dispatch(setAppointmentsUpcomingLoader(true));
        try {
            const response: any = await client.get(`${endpoints.appointments}/upcoming?orderBy=DESC&page=${args.page}&take=10`);
            console.log('response-------upcoming_data---------', response);
            thunkApi.dispatch(setAppointmentsUpcomingCount(response.data.metadata.pagination.itemCount))
            if (response.status == 200 || response.status == 201) {
                thunkApi.dispatch(setAppointmentsUpcomingLoader(false));
                if (args.page == 1) {
                    thunkApi.dispatch(setAppointmentsUpcomingData(response.data.data));
                } else {
                    thunkApi.dispatch(setAppointmentsUpcomingData_More(response.data.data));
                }
            } else {
                thunkApi.dispatch(setAppointmentsUpcomingLoader(false));
            };
        } catch (err) {
            thunkApi.dispatch(setAppointmentsUpcomingLoader(false));
        };
    },
);

export const upcoming_update = createAsyncThunk(
    'UPCOMING_UPDATE',
    async (args: UpcomingUpdate, thunkApi) => {
        thunkApi.dispatch(setAppointmentsUpcomingUpdateState(''));
        thunkApi.dispatch(setAppointmentsUpcomingLoader(true));
        try {
            const response: any = await client.patch(`${endpoints.appointments}/${args.id}/status-transition`);
            console.log('response-------update---------', response);
            if (response.status == 200 || response.status == 201) {
                thunkApi.dispatch(setAppointmentsUpcomingUpdateState('done'));
                thunkApi.dispatch(setAppointmentsUpcomingLoader(false));
            } else {
                thunkApi.dispatch(setAppointmentsUpcomingUpdateState('error'));
                thunkApi.dispatch(setAppointmentsUpcomingLoader(false));
            }
        } catch (err) {
            thunkApi.dispatch(setAppointmentsUpcomingUpdateState('error'));
            thunkApi.dispatch(setAppointmentsUpcomingLoader(false));
        };
    },
);

