import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    profileLoader: false,
    profileData: {},
    profileUpdateState: '',
    passwordUpdateState: '',
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfileLoader: (state, action) => {
        state.profileLoader = action.payload;
    },
    setProfileData: (state, action) => {
        state.profileData = action.payload;
    },
    setProfileUpdateState: (state, action) => {
        console.log('----setProfileUpdateState---', action.payload);
        state.profileUpdateState = action.payload;
    },
    setPasswordUpdateState: (state, action) => {
        state.passwordUpdateState = action.payload;
    },
  },
});

export const {
    setProfileLoader,
    setProfileData,
    setProfileUpdateState,
    setPasswordUpdateState,
} =
profileSlice.actions;

export default profileSlice.reducer;
