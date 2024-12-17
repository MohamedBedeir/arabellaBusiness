import { createAsyncThunk } from '@reduxjs/toolkit';
import endpoints from '../../../network/endpoints';
import { client } from '../../../network/apiClient';
import { order_details } from '../details/details';
import { setOrderDetailsLoader } from '../../../redux/store/order_details/order_detailsSlice';

interface OrderUpdate {
    id: number;
    status: string;
};

export const order_update = createAsyncThunk(
    'ORDER_UPDATE',
    async (args: OrderUpdate, thunkApi) => {
        thunkApi.dispatch(setOrderDetailsLoader(true));
        try {
            var data = {
                status: args?.status,
                comment: '',
            };
            const response: any = await client.patch(`${endpoints.product_orders}/${args.id}/status-transition`, data);
            console.log('response-------appointment_update---------', response);
            if (response.status == 200 || response.status == 201) {
                thunkApi.dispatch(order_details({id: args.id}))
            } else {
                thunkApi.dispatch(setOrderDetailsLoader(false));
            };
        } catch (err) {
            thunkApi.dispatch(setOrderDetailsLoader(false));
        };
    },
);



