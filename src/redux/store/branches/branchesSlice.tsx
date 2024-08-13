import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    branchesLoader: false,
    branchAddState: '',
    branchEditState: '',
    branchDeleteState: '',
    branchesData: [],
    branchesCount: 0,
};

export const branchesSlice = createSlice({
  name: 'branches',
  initialState,
  reducers: {
    setBranchesLoader: (state, action) => {
      state.branchesLoader = action.payload;
    },
    setBrancheAddState: (state, action) => {
        state.branchAddState = action.payload;
    },
    setBrancheEditState: (state, action) => {
        state.branchEditState = action.payload;
    },
    setBrancheDeleteState: (state, action) => {
        state.branchDeleteState = action.payload;
    },
    setBranchData: (state, action) => {
        console.log('action.payload------1', action.payload);
        state.branchesData = action.payload;
    },
    setBranchData_More: (state, action) => {
        console.log('action.payload------2', action.payload);
        state.branchesData = [...state.branchesData, ...action.payload];
    },
    setBranchesCount: (state, action) => {
        state.branchesCount = action.payload;
    },
  },
});

export const {
    setBranchesLoader,
    setBrancheAddState,
    setBrancheEditState,
    setBrancheDeleteState,
    setBranchData,
    setBranchData_More,
    setBranchesCount,
} =
branchesSlice.actions;

export default branchesSlice.reducer;
