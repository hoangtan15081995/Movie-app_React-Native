import {createSlice} from '@reduxjs/toolkit';
import { GetNowPlaying } from '../../../services/apiService';


const initialState = {
  listMoviesNowPlaying: [],
  pageCurrentNowPlaying: 1,
  isLoading: false
};

const slice = createSlice({
  name: 'moviesNowPlaying',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true
    },

    getListMoviesNowPlayingSuccess(state, action) {
      const {data, page} = action.payload;
      let listMoviesNowPlaying = state.listMoviesNowPlaying;
      let pageCurrentNowPlaying = state.pageCurrentNowPlaying;
      console.log(pageCurrentNowPlaying, 'pageCurrent now');
      console.log(page, 'pageNow');

      if (page === 1) {
        if (listMoviesNowPlaying.length === 0) {
          state.listMoviesNowPlaying = listMoviesNowPlaying.concat(data);
          state.isLoading = false;
        } else {
          state.listMoviesNowPlaying = listMoviesNowPlaying;
          state.isLoading = false;
        }
      }

      if (page > 1) {
        if (page > state.pageCurrentNowPlaying) {
          state.pageCurrentNowPlaying = page;
          state.listMoviesNowPlaying = listMoviesNowPlaying.concat(data);
          state.isLoading = false;
        } else {
          state.listMoviesNowPlaying = listMoviesNowPlaying;
          state.isLoading = false;
        }
      }
      state.listMoviesNowPlaying = [];
      state.pageCurrentNowPlaying = 1;
      state.isLoading = false
    },
  },

});

export default slice.reducer;

export const getListMoviesNowPlaying = (page) => async (dispatch) => {
  console.log("page check",page)
  dispatch(slice.actions.startLoading());
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
