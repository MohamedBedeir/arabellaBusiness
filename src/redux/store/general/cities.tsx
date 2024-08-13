import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  citiesData: [],
};

export const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    setCitiesData: (state, action) => {
      state.citiesData = action.payload;
    },
  },
});

export const {
  setCitiesData,
  
} =
citiesSlice.actions;

export default citiesSlice.reducer;
