import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    appointmentDetailsLoader: false,
    appointmentUpdateState: '',
};

export const appointment_updateSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAppointmentDetailsLoader: (state, action) => {
      state.appointmentDetailsLoader = action.payload;
    },
    setAppointmentUpdateState: (state, action) => {
        state.appointmentUpdateState = action.payload;
    },
  },
});

export const {
    setAppointmentDetailsLoader,
    setAppointmentUpdateState,
} =
appointment_updateSlice.actions;

export default appointment_updateSlice.reducer;
