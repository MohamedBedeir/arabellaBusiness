import { createAsyncThunk } from '@reduxjs/toolkit';
import endpoints from '../../../network/endpoints';
import { client } from '../../../network/apiClient';
import { setAppointmentDetailsData, setAppointmentDetailsLoader } from '../../../redux/store/appointment_details/appointment_detailsSlice';
import { appointment_update } from '../update/update';

interface PerviousData {
    id: number;
};

export const appointment_details = createAsyncThunk(
    'PERVIOUS_DATA',
    async (args: PerviousData, thunkApi) => {
        thunkApi.dispatch(setAppointmentDetailsLoader(true));
        try {
            const response: any = await client.get(`${endpoints.appointments}/${args.id}`);
            console.log('response-------appointment_details---------', response);
            if (response.status == 200 || response.status == 201) {
                if (response.data.data.status == 'pending_review_by_service_provider') {
                    thunkApi.dispatch(appointment_update({id: response.data.data.id, status: 'reviewing', fees: 0}));
                } else {
                    thunkApi.dispatch(setAppointmentDetailsLoader(false));
                    thunkApi.dispatch(setAppointmentDetailsData(response.data.data));
                }
            } else {
                thunkApi.dispatch(setAppointmentDetailsLoader(false));
            };
        } catch (err) {
            thunkApi.dispatch(setAppointmentDetailsLoader(false));
        };
    },
);
