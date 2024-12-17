import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  orderDetailsLoader: false,
  orderDetailsData: {},
};

export const order_detailsSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setOrderDetailsLoader: (state, action) => {
      state.orderDetailsLoader = action.payload;
    },
    setOrderDetailsData: (state, action) => {
        state.orderDetailsData = action.payload;
    },
  },
});

export const {
    setOrderDetailsLoader,
    setOrderDetailsData,
} =
order_detailsSlice.actions;

export default order_detailsSlice.reducer;
