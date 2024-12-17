import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  ordersCancelledLoader: false,
  ordersCancelledData: [],
  ordersCancelledCount: 0,
};

export const orders_cancelledSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setOrdersCancelledLoader: (state, action) => {
      state.ordersCancelledLoader = action.payload;
    },
    setOrdersCancelledData: (state, action) => {
        state.ordersCancelledData = action.payload;
    },
    setOrdersCancelledData_More: (state, action) => {
        state.ordersCancelledData = [...state.ordersCancelledData, ...action.payload];
    },
    setOrdersCancelledCount: (state, action) => {
        state.ordersCancelledCount = action.payload;
    },
  },
});

export const {
  setOrdersCancelledLoader,
  setOrdersCancelledData,
  setOrdersCancelledData_More,
  setOrdersCancelledCount,
} =
orders_cancelledSlice.actions;

export default orders_cancelledSlice.reducer;
