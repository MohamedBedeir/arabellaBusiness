import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    employeesLoader: false,
    employeeAddState: '',
    employeeEditState: '',
    employeeDeleteState: '',
    employeeData: [],
    employeeCount: 0,
};
export const employeesSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setEmployeesLoader: (state, action) => {
        state.employeesLoader = action.payload;
    },
    setEmployeeAddState: (state, action) => {
        state.employeeAddState = action.payload;
    },
    setEmployeeEditState: (state, action) => {
        state.employeeEditState = action.payload;
    },
    setEmployeeDeleteState: (state, action) => {
        state.employeeDeleteState = action.payload;
    },
    setEmployeesData: (state, action) => {
        console.log('action.payload------1', action.payload);
        state.employeeData = action.payload;
    },
    setEmployeesData_More: (state, action) => {
        state.employeeData = [...state.employeeData, ...action.payload];
    },
    setEmployeeCount: (state, action) => {
        state.employeeCount = action.payload;
    },
  },
});

export const {
    setEmployeesLoader,
    setEmployeeAddState,
    setEmployeeEditState,
    setEmployeeDeleteState,
    setEmployeesData,
    setEmployeesData_More,
    setEmployeeCount,
} =
employeesSlice.actions;

export default employeesSlice.reducer;
