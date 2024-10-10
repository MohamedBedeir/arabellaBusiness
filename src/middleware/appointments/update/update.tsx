import { createAsyncThunk } from '@reduxjs/toolkit';
import endpoints from '../../../network/endpoints';
import { client } from '../../../network/apiClient';
import { setAppointmentDetailsData, setAppointmentDetailsLoader } from '../../../redux/store/appointment_details/appointment_detailsSlice';
import { appointment_details } from '../details/details';

interface AppointmentUpdate {
    id: number;
    status: string;
    fees?: number;
    note?: string;
    feeId?: any;
    otp?: any;
};

export const appointment_update = createAsyncThunk(
    'PERVIOUS_DATA',
    async (args: AppointmentUpdate, thunkApi) => {
        console.log('args----------------', args);
        
        thunkApi.dispatch(setAppointmentDetailsLoader(true));
        try {
            var data = {
                status: args.status,
                fees: args.fees,
                otp: args.otp,
            };
            if (args?.feeId) {
                data = {...data, ...{feeId: args?.feeId}}
            }
            const response: any = await client.patch(`${endpoints.appointments}/${args.id}/status-transition`, data);
            console.log('response-------appointment_update---------', response);
            if (response.status == 200 || response.status == 201) {
                thunkApi.dispatch(appointment_details({id: args.id}))
            } else {
                thunkApi.dispatch(setAppointmentDetailsLoader(false));
            };
        } catch (err) {
            thunkApi.dispatch(setAppointmentDetailsLoader(false));
        };
    },
);

export const appointment_otp = createAsyncThunk(
    'PERVIOUS_DATA',
    async (args: any, thunkApi) => {
        thunkApi.dispatch(setAppointmentDetailsLoader(true));
        try {
            const data = {}
            const response: any = await client.post(`${endpoints.appointments}/${args.id}/completion-otp`, data);
            console.log('response-------appointment_otp---------', response);
            thunkApi.dispatch(setAppointmentDetailsLoader(false));
        } catch (err) {
            thunkApi.dispatch(setAppointmentDetailsLoader(false));
        };
    },
);


