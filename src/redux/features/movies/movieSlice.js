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
      const { data, page } = action.payload;
      let listMoviesNowPlaying = state.listMoviesNowPlaying;
      if (page >= 2) {
        state.listMoviesNowPlaying = listMoviesNowPlaying.concat(data);
      } else {
        state.listMoviesNowPlaying = data;
      }
   
    },
    getMoviePopularSuccess(state, action) {
      state.listMoviesPopular = action.payload;
    },
  },

});

export default slice.reducer;

export const getListMoviesNowPlaying = (page) => async (dispatch) => {
  try {
    const response = await GetNowPlaying(`/movie/now_playing`, page);
      // console.log("all now playing",response);
      dispatch(
        slice.actions.getListMoviesNowPlayingSuccess({ data: response.results, page }),
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
