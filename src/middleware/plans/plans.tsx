import {createAsyncThunk} from '@reduxjs/toolkit';
import endpoints from '../../network/endpoints';
import {client} from '../../network/apiClient';
import { setBuyPlanLoader, setBuyPlanState, setMyPlanData, setPlansData, setPlansLoader } from '../../redux/store/plans/plans';
import { userData } from '../profile/profile';

export const getPlans = createAsyncThunk(
  'PLANS',
  async (args: any, thunkApi) => {
    try {
      thunkApi.dispatch(setPlansLoader(true));
      const response: any = await client.get(endpoints.plans);
      console.log('response-----getPlans-------', response);
      thunkApi.dispatch(setPlansData(response.data.data));
      thunkApi.dispatch(setPlansLoader(false));
    } catch (err) {
      console.log(err);
      thunkApi.dispatch(setPlansLoader(false));
    }
  },
);

export const buyPlan = createAsyncThunk(
  'PLANS',
  async (args: any, thunkApi) => {
    try {
      thunkApi.dispatch(setBuyPlanLoader(true));
      thunkApi.dispatch(setBuyPlanState(''));
      const data = {
        payment_type: args.payment_type,
        plan_id: args.plan_id,
      };
      const response: any = await client.post(endpoints.buyPlan, data);
      if (response.status == 200) {
        console.log('response-----buyPlan-------', response);
        thunkApi.dispatch(getMyPlan({}));
        thunkApi.dispatch(setBuyPlanState('done'));
        thunkApi. dispatch(userData({}));
        thunkApi.dispatch(setBuyPlanLoader(false));
      }
    } catch (err) {
      console.log(err);
      thunkApi.dispatch(setBuyPlanState('error'));
      thunkApi.dispatch(setBuyPlanLoader(false));
    }
  },
);

export const getMyPlan = createAsyncThunk(
  'PLANS',
  async (args: any, thunkApi) => {
    try {
      thunkApi.dispatch(setPlansLoader(true));
      const response: any = await client.get(endpoints.myPlan);
      console.log('response-----getMyPlan-------', response);
      thunkApi.dispatch(setMyPlanData(response.data.data));
      thunkApi.dispatch(setPlansLoader(false));
    } catch (err: any) {
      if (err.data.message  == 'Not have plan yes, buy new plan') {
        thunkApi.dispatch(setMyPlanData(''));
      }
      console.log(err);
      thunkApi.dispatch(setPlansLoader(false));
    }
  },
);

