import {createSlice} from '@reduxjs/toolkit';
import { GetNowPlaying, GetMoviePopular } from '../../../services/apiService';


const initialState = {
  listMoviesNowPlaying: [],
  listMoviesPopular: [],
}

const slice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    getListMoviesNowPlayingSuccess(state, action) {
      state.listMoviesNowPlaying = action.payload;
    },
    getMoviePopularSuccess(state, action) {
      state.listMoviesPopular = action.payload;
    },
  },

});

export default slice.reducer;

export const getListMoviesNowPlaying = () => async (dispatch) => {
  try {
    const response = await GetNowPlaying(`/movie/now_playing`);
      // console.log(response, "all");
    dispatch(
      slice.actions.getListMoviesNowPlayingSuccess(response.results),
    );
  } catch (error) {
    console.log(error);
  }
};

export const getMoviePopular = () => async dispatch => {
  try {
    const response = await GetMoviePopular(`/movie/upcoming`);
    // console.log(response, "action");
    dispatch(slice.actions.getMoviePopularSuccess(response.results));
  } catch (error) {
    console.log(error);
  }
};
