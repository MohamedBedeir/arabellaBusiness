import { createAsyncThunk } from '@reduxjs/toolkit';
import endpoints from '../../../network/endpoints';
import { client } from '../../../network/apiClient';
import { setOrderDetailsData, setOrderDetailsLoader } from '../../../redux/store/order_details/order_detailsSlice';

interface PerviousData {
    id: number;
};

export const order_details = createAsyncThunk(
    'PERVIOUS_DATA',
    async (args: PerviousData, thunkApi) => {
        thunkApi.dispatch(setOrderDetailsLoader(true));
        try {
            const response: any = await client.get(`${endpoints.product_orders}/${args.id}`);
            console.log('response-------order_details---------', response);
            if (response.status == 200 || response.status == 201) {
                thunkApi.dispatch(setOrderDetailsLoader(false));
                thunkApi.dispatch(setOrderDetailsData(response.data.data));
            } else {
                thunkApi.dispatch(setOrderDetailsLoader(false));
            };
        } catch (err) {
            thunkApi.dispatch(setOrderDetailsLoader(false));
        };
    },
);
