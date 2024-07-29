import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    notificationsLoader: false,
    notificationsData: [],
    notificationsDeleteState: '',
};

export const notificationsSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setNotificationsLoader: (state, action) => {
        state.notificationsLoader = action.payload;
    },
    setNotificationsData: (state, action) => {
        state.notificationsData = action.payload;
    },
    setNotificationsDeleteState: (state, action) => {
        state.notificationsDeleteState = action.payload;
    },
  },
});

export const {
    setNotificationsLoader,
    setNotificationsData,
    setNotificationsDeleteState,
} =
notificationsSlice.actions;

export default notificationsSlice.reducer;
