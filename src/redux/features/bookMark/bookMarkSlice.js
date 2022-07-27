import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  bookMarkMovies: [],
};

const slice = createSlice({
  name: 'bookmark',
  initialState,
  reducers: {
  },
});

export default slice.reducer;

