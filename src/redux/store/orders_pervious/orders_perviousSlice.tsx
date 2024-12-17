import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  ordersPerviousLoader: false,
  ordersPerviousData: [],
  ordersPerviousCount: 0,
};

export const orders_perviousSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setOrdersPerviousLoader: (state, action) => {
      state.ordersPerviousLoader = action.payload;
    },
    setOrdersPerviousData: (state, action) => {
        state.ordersPerviousData = action.payload;
    },
    setOrdersPerviousData_More: (state, action) => {
        state.ordersPerviousData = [...state.ordersPerviousData, ...action.payload];
    },
    setOrdersPerviousCount: (state, action) => {
        state.ordersPerviousCount = action.payload;
    },
  },
});

export const {
    setOrdersPerviousLoader,
    setOrdersPerviousData,
    setOrdersPerviousData_More,
    setOrdersPerviousCount,
} =
orders_perviousSlice.actions;

export default orders_perviousSlice.reducer;
