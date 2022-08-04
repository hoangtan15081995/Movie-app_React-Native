import {createSlice} from '@reduxjs/toolkit';
import { GetNowPlaying } from '../../../services/apiService';


const initialState = {
  listMoviesNowPlaying: [],
  pageCurrentNowPlaying: 1,
};

const slice = createSlice({
  name: 'moviesNowPlaying',
  initialState,
  reducers: {
    getListMoviesNowPlayingSuccess(state, action) {
      const {data, page} = action.payload;
      let listMoviesNowPlaying = state.listMoviesNowPlaying;
      let pageCurrentNowPlaying = state.pageCurrentNowPlaying;
      console.log(pageCurrentNowPlaying, 'pageCurrent now');
      console.log(page, 'pageNow');

      if (page === 1) {
        if (listMoviesNowPlaying.length === 0) {
          state.listMoviesNowPlaying = listMoviesNowPlaying.concat(data);
        } else {
          state.listMoviesNowPlaying = listMoviesNowPlaying;
        }
      }

      if (page > 1) {
        if (page > state.pageCurrentNowPlaying) {
          state.pageCurrentNowPlaying = page;
          state.listMoviesNowPlaying = listMoviesNowPlaying.concat(data);
        } else {
          state.listMoviesNowPlaying = listMoviesNowPlaying;
        }
      }
      // state.listMoviesNowPlaying = [];
      // state.pageCurrentNowPlaying = 1;
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
