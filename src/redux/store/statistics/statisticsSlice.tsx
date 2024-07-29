import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  statisticsLoader: false,
  statisticsData: {},
  setStatisticsData_TotalAppointments: [],
  statisticsData_TotalAppointments: [],
  statisticsData_TotalPaidAmount: [],
  statisticsData_TotalRefundAmount: [],
  statisticsData_Counts: {},
};

export const statisticsSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setStatisticsLoader: (state, action) => {
      state.statisticsLoader = action.payload;
    },
    setStatisticsData: (state, action) => {
      state.statisticsData = action.payload;
    },
    setStatisticsData_TotalAppointments: (state, action) => {
      state.statisticsData_TotalAppointments = action.payload;
    },
    setStatisticsData_TotalPaidAmount: (state, action) => {
      state.statisticsData_TotalPaidAmount = action.payload;
    },
    setStatisticsData_TotalRefundAmount: (state, action) => {
      state.statisticsData_TotalRefundAmount = action.payload;
    },
    setStatisticsData_Counts: (state, action) => {
      state.statisticsData_Counts = action.payload;
    },
  },
});

export const {
  setStatisticsLoader,
  setStatisticsData,
  setStatisticsData_TotalAppointments,
  setStatisticsData_TotalPaidAmount,
  setStatisticsData_TotalRefundAmount,
  setStatisticsData_Counts,
} =
statisticsSlice.actions;

export default statisticsSlice.reducer;
