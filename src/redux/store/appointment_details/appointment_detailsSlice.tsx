import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  appointmentDetailsLoader: false,
    appointmentDetailsData: {},
};

export const appointment_detailsSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAppointmentDetailsLoader: (state, action) => {
      state.appointmentDetailsLoader = action.payload;
    },
    setAppointmentDetailsData: (state, action) => {
        state.appointmentDetailsData = action.payload;
    },
  },
});

export const {
    setAppointmentDetailsLoader,
    setAppointmentDetailsData,
} =
appointment_detailsSlice.actions;

export default appointment_detailsSlice.reducer;
