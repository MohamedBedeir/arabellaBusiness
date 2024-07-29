import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    appointmentsPerviousLoader: false,
    appointmentsPerviousData: [],
    appointmentsPerviousCount: 0,
};

export const appointments_PerviousSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAppointmentsPerviousLoader: (state, action) => {
      state.appointmentsPerviousLoader = action.payload;
    },
    setAppointmentsPerviousData: (state, action) => {
        state.appointmentsPerviousData = action.payload;
    },
    setAppointmentsPerviousData_More: (state, action) => {
        state.appointmentsPerviousData = [...state.appointmentsPerviousData, ...action.payload];
    },
    setAppointmentsPerviousCount: (state, action) => {
        state.appointmentsPerviousCount = action.payload;
    },
  },
});

export const {
    setAppointmentsPerviousLoader,
    setAppointmentsPerviousData,
    setAppointmentsPerviousData_More,
    setAppointmentsPerviousCount,
} =
appointments_PerviousSlice.actions;

export default appointments_PerviousSlice.reducer;
