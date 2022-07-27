import {createSlice} from '@reduxjs/toolkit';
import { GetNowPlaying } from '../../../services/apiService';


const initialState = {
  listMoviesNowPlaying: [],
  bookMarkMovies: [],
}

const slice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    getListMoviesNowPlayingSuccess(state, action) {
      state.listMoviesNowPlaying = action.payload;
    },
  },
});

export default slice.reducer;

export const getListMoviesNowPlaying = () => async (dispatch) => {
  try {
    const response = await GetNowPlaying(`/movie/now_playing`);
    dispatch(
      slice.actions.getListMoviesNowPlayingSuccess(response.results),
    );
  } catch (error) {
    console.log(error);
  }
};