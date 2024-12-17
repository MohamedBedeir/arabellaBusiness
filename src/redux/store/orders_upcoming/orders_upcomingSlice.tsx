import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  ordersUpcomingLoader: false,
  ordersUpcomingData: [],
  ordersUpcomingCount: 0,
  ordersUpcomingUpdateState: '',
};

export const orders_upcomingSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setOrdersUpcomingLoader: (state, action) => {
      state.ordersUpcomingLoader = action.payload;
    },
    setOrdersUpcomingData: (state, action) => {
        state.ordersUpcomingData = action.payload;
    },
    setOrdersUpcomingData_More: (state, action) => {
        state.ordersUpcomingData = [...state.ordersUpcomingData, ...action.payload];
    },
    setOrdersUpcomingCount: (state, action) => {
        state.ordersUpcomingCount = action.payload;
    },
    setOrdersUpcomingUpdateState: (state, action) => {
        state.ordersUpcomingUpdateState = action.payload;
    },
  },
});

export const {
    setOrdersUpcomingLoader,
    setOrdersUpcomingData,
    setOrdersUpcomingData_More,
    setOrdersUpcomingCount,
    setOrdersUpcomingUpdateState,
} =
orders_upcomingSlice.actions;

export default orders_upcomingSlice.reducer;
