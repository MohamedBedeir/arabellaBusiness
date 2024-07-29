import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    slotsLoader: false,
    slotAddState: '',
    slotEditState: '',
    slotDeleteState: '',
    slotData: [],
    slotCount: 0,
};

export const slotsSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setslotsLoader: (state, action) => {
      state.slotsLoader = action.payload;
    },
    setslotAddState: (state, action) => {
        state.slotAddState = action.payload;
    },
    setslotEditState: (state, action) => {
        state.slotEditState = action.payload;
    },
    setslotDeleteState: (state, action) => {
        state.slotDeleteState = action.payload;
    },
    setslotsData: (state, action) => {
        console.log('action.payload------1', action.payload);
        state.slotData = action.payload;
    },
    setslotsData_More: (state, action) => {
        console.log('action.payload------2', action.payload);
        state.slotData = [...state.slotData, ...action.payload];
    },
    setslotCount: (state, action) => {
        state.slotCount = action.payload;
    },
  },
});

export const {
    setslotsLoader,
    setslotAddState,
    setslotEditState,
    setslotDeleteState,
    setslotsData,
    setslotsData_More,
    setslotCount,
} =
slotsSlice.actions;

export default slotsSlice.reducer;
