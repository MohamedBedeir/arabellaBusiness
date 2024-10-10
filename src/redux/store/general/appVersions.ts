import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  appVersionsData: {},
};

export const appVersionsSlice = createSlice({
  name: 'search_home',
  initialState,
  reducers: {
    setAppVersionsData: (state, action) => {
      state.appVersionsData = action.payload;
    },
  },
});

export const {
    setAppVersionsData,
} = appVersionsSlice.actions;

export default appVersionsSlice.reducer;
