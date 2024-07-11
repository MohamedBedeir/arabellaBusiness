import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  authenticationLoader: false,
  loginState: '',
  registerState: '',
  registerError: {},
  confirmationCodeState: '',
  forgotPasswordState: '',
  resetPasswordState: '',
  userData: {},
  isUserAuthorized: false,
  errorStatus: 0,
};

export const authenticationSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticationLoader: (state, action) => {
      state.authenticationLoader = action.payload;
    },
    setLoginState: (state, action) => {
      state.loginState = action.payload;
    },
    setRegisterState: (state, action) => {
      state.registerState = action.payload;
    },
    setConfirmationCodeState: (state, action) => {
      state.confirmationCodeState = action.payload;
    },
    setForgotPasswordState: (state, action) => {
      state.forgotPasswordState = action.payload;
    },
    setRegisterError: (state, action) => {
      state.registerError = action.payload;
    },
    setResetPasswordState: (state, action) => {
      state.forgotPasswordState = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setUserStatus: (state, action) => {
      state.isUserAuthorized = action.payload;
    },
    
    setErrorStatus: (state, action) => {
      state.errorStatus = action.payload;
    },
  },
});

export const {
  setAuthenticationLoader,
  setLoginState,
  setRegisterState,
  setRegisterError,
  setConfirmationCodeState,
  setForgotPasswordState,
  setResetPasswordState,
  setErrorStatus,
} =
authenticationSlice.actions;

export default authenticationSlice.reducer;
