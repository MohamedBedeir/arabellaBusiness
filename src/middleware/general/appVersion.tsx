import {createAsyncThunk} from '@reduxjs/toolkit';
import { get } from '../../network';
import endpoints from '../../network/endpoints';
import { setAppVersionsData } from '../../redux/store/general/appVersions';

export const appVersions = createAsyncThunk(
  'APP_VERSIONS',
  async (args: any, thunkApi) => {
    try {
        const response = await get(endpoints.mobileVersions);
        thunkApi.dispatch(setAppVersionsData(response.data.data));
    } catch (err) {
    }
});