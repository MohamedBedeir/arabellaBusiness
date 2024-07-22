import {createAsyncThunk} from '@reduxjs/toolkit';
import endpoints from '../../network/endpoints';
import {client} from '../../network/apiClient';
import { setTransactionsData, setTransactionsLoader } from '../../redux/store/plans/transactions';

export const getTransactions = createAsyncThunk(
  'PLANS',
  async (args: any, thunkApi) => {
    try {
      thunkApi.dispatch(setTransactionsLoader(true));
      const response: any = await client.get(endpoints.transactions);
      console.log('response-----getTransactions-------', response);
      thunkApi.dispatch(setTransactionsData(response.data.data));
      thunkApi.dispatch(setTransactionsLoader(false));
    } catch (err) {
      console.log(err);
      thunkApi.dispatch(setTransactionsLoader(false));
    }
  },
);