import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  appointmentTimer: 20 * 60,
};

export const appointment_timerSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAppointmentTimer: (state, action) => {
      console.log('setAppointmentTimer------------------', action);
      state.appointmentTimer = action.payload;
    },
  },
});

export const {
    setAppointmentTimer,
} =
appointment_timerSlice.actions;

export default appointment_timerSlice.reducer;
