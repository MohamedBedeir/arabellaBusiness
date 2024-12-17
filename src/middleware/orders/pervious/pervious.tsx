import { createAsyncThunk } from '@reduxjs/toolkit';
import endpoints from '../../../network/endpoints';
import { client } from '../../../network/apiClient';
import { setOrdersPerviousCount, setOrdersPerviousData, setOrdersPerviousData_More, setOrdersPerviousLoader } from '../../../redux/store/orders_pervious/orders_perviousSlice';

interface PerviousData {
    page: number;
};

export const pervious_data_product_orders = createAsyncThunk(
    'PERVIOUS_DATA',
    async (args: PerviousData, thunkApi) => {
        thunkApi.dispatch(setOrdersPerviousLoader(true));
        args.page == 1 && thunkApi.dispatch(setOrdersPerviousData([]));
        try {
            const response: any = await client.get(`${endpoints.product_orders}/pervious?page=${args.page}&take=10`);
            console.log('response-------pervious_data_product_orders---------', response);
            thunkApi.dispatch(setOrdersPerviousCount(response.data.metadata.pagination.itemCount))
            if (response.status == 200 || response.status == 201) {
                thunkApi.dispatch(setOrdersPerviousLoader(false));
                if (args.page == 1) {
                    thunkApi.dispatch(setOrdersPerviousData(response.data.data));
                } else {
                    thunkApi.dispatch(setOrdersPerviousData_More(response.data.data));
                }
            } else {
                thunkApi.dispatch(setOrdersPerviousLoader(false));
            };
        } catch (err) {
            thunkApi.dispatch(setOrdersPerviousLoader(false));
        };
    },
);
