import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    categoriesData: [],
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categoriesData = action.payload;
    },
  },
});

export const {
  setCategories,
  
} =
categoriesSlice.actions;

export default categoriesSlice.reducer;
