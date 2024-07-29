import {createAsyncThunk} from '@reduxjs/toolkit';
import endpoints from '../../network/endpoints';
import {client} from '../../network/apiClient';
import { setCategories } from '../../redux/store/general/categories';


export const categories = createAsyncThunk(
    'CATEGORIES',
    async (args: any, thunkApi) => {
      try {
        const response: any = await client.get(endpoints.categories);
        console.log('response-----categories-------', response);
        thunkApi.dispatch(setCategories(response.data.data));
      } catch (err) {
        console.log(err);
      }
    },
  );