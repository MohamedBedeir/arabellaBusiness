import { createAsyncThunk } from '@reduxjs/toolkit';
import endpoints from '../../../network/endpoints';
import { client } from '../../../network/apiClient';
import { setOrdersCancelledCount, setOrdersCancelledData, setOrdersCancelledData_More, setOrdersCancelledLoader } from '../../../redux/store/orders_cancelled/orders_cancelledSlice';

interface CancelledData {
    page: number;
};

export const cancelled_data_product_orders = createAsyncThunk(
    'CANCELLED_DATA',
    async (args: CancelledData, thunkApi) => {
        thunkApi.dispatch(setOrdersCancelledLoader(true));
        args.page == 1 && thunkApi.dispatch(setOrdersCancelledData([]));
        try {
            const response: any = await client.get(`${endpoints.product_orders}/cancelled?page=${args.page}&take=10`);
            console.log('response-------cancelled_data_product_orders---------', response);
            thunkApi.dispatch(setOrdersCancelledCount(response.data.metadata.pagination.itemCount))
            if (response.status == 200 || response.status == 201) {
                thunkApi.dispatch(setOrdersCancelledLoader(false));
                if (args.page == 1) {
                    thunkApi.dispatch(setOrdersCancelledData(response.data.data));
                } else {
                    thunkApi.dispatch(setOrdersCancelledData_More(response.data.data));
                }
            } else {
                thunkApi.dispatch(setOrdersCancelledLoader(false));
            };
        } catch (err) {
            thunkApi.dispatch(setOrdersCancelledLoader(false));
        };
    },
);
