import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  orderDetailsLoader: false,
  orderUpdateState: '',
};

export const order_updateSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setOrderDetailsLoader: (state, action) => {
      state.orderDetailsLoader = action.payload;
    },
    setOrderUpdateState: (state, action) => {
        state.orderUpdateState = action.payload;
    },
  },
});

export const {
    setOrderDetailsLoader,
    setOrderUpdateState,
} =
order_updateSlice.actions;

export default order_updateSlice.reducer;
