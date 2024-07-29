import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    servicesLoader: false,
    serviceAddState: '',
    serviceEditState: '',
    serviceDeleteState: '',
    serviceData: [],
    serviceCount: 0,
};

export const servicesSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setServicesLoader: (state, action) => {
        state.servicesLoader = action.payload;
    },
    setServiceAddState: (state, action) => {
        state.serviceAddState = action.payload;
    },
    setServiceEditState: (state, action) => {
        state.serviceEditState = action.payload;
    },
    setServiceDeleteState: (state, action) => {
        state.serviceDeleteState = action.payload;
    },
    setServicesData: (state, action) => {
        console.log('action.payload------1', action.payload);
        state.serviceData = action.payload;
    },
    setServicesData_More: (state, action) => {
        console.log('action.payload------2', action.payload);
        state.serviceData = [...state.serviceData, ...action.payload];
    },
    setServiceCount: (state, action) => {
        state.serviceCount = action.payload;
    },
  },
});

export const {
    setServicesLoader,
    setServiceAddState,
    setServiceEditState,
    setServiceDeleteState,
    setServicesData,
    setServicesData_More,
    setServiceCount,
} =
servicesSlice.actions;

export default servicesSlice.reducer;
