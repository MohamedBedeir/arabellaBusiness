import {createAsyncThunk} from '@reduxjs/toolkit';
import endpoints from '../../network/endpoints';
import {client} from '../../network/apiClient';
import { setCitiesData } from '../../redux/store/general/cities';


export const cities = createAsyncThunk(
    'CATEGORIES',
    async (args: any, thunkApi) => {
      try {
        const response: any = await client.get(endpoints.cities);
        console.log('response-----cities-------', response);
        thunkApi.dispatch(setCitiesData(response.data.data));
      } catch (err) {
        console.log(err);
      }
    },
  );