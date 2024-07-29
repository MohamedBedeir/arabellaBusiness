import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  appointmentsUpcomingLoader: false,
    appointmentsUpcomingData: [],
    appointmentsUpcomingCount: 0,
    appointmentsUpcomingUpdateState: '',
};

export const appointments_upcomingSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAppointmentsUpcomingLoader: (state, action) => {
      state.appointmentsUpcomingLoader = action.payload;
    },
    setAppointmentsUpcomingData: (state, action) => {
        state.appointmentsUpcomingData = action.payload;
    },
    setAppointmentsUpcomingData_More: (state, action) => {
        state.appointmentsUpcomingData = [...state.appointmentsUpcomingData, ...action.payload];
    },
    setAppointmentsUpcomingCount: (state, action) => {
        state.appointmentsUpcomingCount = action.payload;
    },
    setAppointmentsUpcomingUpdateState: (state, action) => {
        state.appointmentsUpcomingUpdateState = action.payload;
    },
  },
});

export const {
    setAppointmentsUpcomingLoader,
    setAppointmentsUpcomingData,
    setAppointmentsUpcomingData_More,
    setAppointmentsUpcomingCount,
    setAppointmentsUpcomingUpdateState,
} =
appointments_upcomingSlice.actions;

export default appointments_upcomingSlice.reducer;
