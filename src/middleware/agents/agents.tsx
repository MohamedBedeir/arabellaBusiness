import {createAsyncThunk} from '@reduxjs/toolkit';
import {client} from '../../network/apiClient';
import { setAgentsData, setAgentsLoader, setAgentsTotal } from '../../redux/store/agents/agents';
import { exclusiveProperties } from '../properties/properties';
import endpoints from '../../network/endpoints';

export const agents = createAsyncThunk(
  'AGENTS',
  async (args: any, thunkApi) => {
    thunkApi.dispatch(setAgentsLoader(true));
    try {
        const response: any = await client.get(`${endpoints.agents}?type=company&paginate=10&page=${args.page}`);
        console.log('response-----agents-------', response);
        if (args.from == 'home') {
          thunkApi.dispatch(setAgentsData(response.data.data));
          thunkApi.dispatch(setAgentsTotal(response.data?.meta?.total))
          thunkApi.dispatch(exclusiveProperties({page: 1}));
        } else {
          thunkApi.dispatch(setAgentsLoader(false));
        }
    } catch (err) {
        thunkApi.dispatch(exclusiveProperties({page: 1}));
        console.log(err);
    }
  },
);
