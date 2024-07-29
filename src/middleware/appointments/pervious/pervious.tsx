import { createAsyncThunk } from '@reduxjs/toolkit';
import endpoints from '../../../network/endpoints';
import { client } from '../../../network/apiClient';
import { setAppointmentsPerviousLoader, setAppointmentsPerviousCount, setAppointmentsPerviousData, setAppointmentsPerviousData_More } from '../../../redux/store/appointments_pervious/appointments_perviousSlice';

interface PerviousData {
    page: number;
    status: string;
};

export const pervious_data = createAsyncThunk(
    'PERVIOUS_DATA',
    async (args: PerviousData, thunkApi) => {
        thunkApi.dispatch(setAppointmentsPerviousLoader(true));
        try {
            const response: any = await client.get(`${endpoints.appointments}/pervious?status=${args?.status}&orderBy=DESC&page=${args.page}&take=10`);
            console.log('response-------pervious_data---------', response);
            thunkApi.dispatch(setAppointmentsPerviousCount(response.data.metadata.pagination.itemCount))
            if (response.status == 200 || response.status == 201) {
                thunkApi.dispatch(setAppointmentsPerviousLoader(false));
                if (args.page == 1) {
                    thunkApi.dispatch(setAppointmentsPerviousData(response.data.data));
                } else {
                    thunkApi.dispatch(setAppointmentsPerviousData_More(response.data.data));
                }
            } else {
                thunkApi.dispatch(setAppointmentsPerviousLoader(false));
            };
        } catch (err) {
            thunkApi.dispatch(setAppointmentsPerviousLoader(false));
        };
    },
);
