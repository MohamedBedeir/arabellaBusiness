import { createAsyncThunk } from '@reduxjs/toolkit';
import endpoints from '../../../network/endpoints';
import { client } from '../../../network/apiClient';
import { setOrdersUpcomingCount, setOrdersUpcomingData, setOrdersUpcomingData_More, setOrdersUpcomingLoader, setOrdersUpcomingUpdateState } from '../../../redux/store/orders_upcoming/orders_upcomingSlice';

interface UpcomingData {
    page: number;
};
interface UpcomingUpdate {
    id: number;
    data: any;
};

export const upcoming_data_product_orders = createAsyncThunk(
    'UPCOMING_DATA',
    async (args: UpcomingData, thunkApi) => {
        thunkApi.dispatch(setOrdersUpcomingLoader(true));
        args.page == 1 && thunkApi.dispatch(setOrdersUpcomingData([]));
        try {
            const response: any = await client.get(`${endpoints.product_orders}/upcoming?page=${args.page}&take=10`);
            console.log('response-------upcoming_data_product_orders---------', response);
            thunkApi.dispatch(setOrdersUpcomingCount(response.data.metadata.pagination.itemCount))
            if (response.status == 200 || response.status == 201) {
                thunkApi.dispatch(setOrdersUpcomingLoader(false));
                if (args.page == 1) {
                    thunkApi.dispatch(setOrdersUpcomingData(response.data.data));
                } else {
                    thunkApi.dispatch(setOrdersUpcomingData_More(response.data.data));
                }
            } else {
                thunkApi.dispatch(setOrdersUpcomingLoader(false));
            };
        } catch (err) {
            thunkApi.dispatch(setOrdersUpcomingLoader(false));
        };
    },
);

export const upcoming_update_product_orders = createAsyncThunk(
    'UPCOMING_UPDATE',
    async (args: UpcomingUpdate, thunkApi) => {
        thunkApi.dispatch(setOrdersUpcomingUpdateState(''));
        thunkApi.dispatch(setOrdersUpcomingLoader(true));
        try {
            const response: any = await client.patch(`${endpoints.product_orders}/${args.id}/status-transition`);
            console.log('response-------update---------', response);
            if (response.status == 200 || response.status == 201) {
                thunkApi.dispatch(setOrdersUpcomingUpdateState('done'));
                thunkApi.dispatch(setOrdersUpcomingLoader(false));
            } else {
                thunkApi.dispatch(setOrdersUpcomingUpdateState('error'));
                thunkApi.dispatch(setOrdersUpcomingLoader(false));
            }
        } catch (err) {
            thunkApi.dispatch(setOrdersUpcomingUpdateState('error'));
            thunkApi.dispatch(setOrdersUpcomingLoader(false));
        };
    },
);

