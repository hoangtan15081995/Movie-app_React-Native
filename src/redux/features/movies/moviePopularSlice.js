import {createSlice} from '@reduxjs/toolkit';
import { GetMoviePopular } from '../../../services/apiService';

const initialState = {
  listMoviesPopular: [],
  pageCurrentPopular: 1,
};

const slice = createSlice({
  name: 'moviesPopular',
  initialState,
  reducers: {
    getListMoviesPopularSuccess(state, action) {
      const {data, page} = action.payload;
      let listMoviesPopular = state.listMoviesPopular;
      let pageCurrentPopular = state.pageCurrentPopular;
      console.log(pageCurrentPopular, 'pageCurrentPopular');
      console.log(page, 'pagePopular');

      if (page === 1) {
        if (listMoviesPopular.length === 0) {
          state.listMoviesPopular = listMoviesPopular.concat(data);
        } else {
          state.listMoviesPopular = listMoviesPopular;
        }
      }

      if (page > 1) {
        if (page > state.pageCurrentPopular) {
          state.pageCurrentPopular = page;
          state.listMoviesPopular = listMoviesPopular.concat(data);
        }
        if (page === state.pageCurrentPopular) {
          return state
        }
      }
      // state.listMoviesPopular = [];
      // state.pageCurrentPopular = 1;
    },
  },
});

export default slice.reducer;


export const getListMoviesPopular = (page) => async dispatch => {
  try {
    const response = await GetMoviePopular(`/movie/popular`, page);
    // console.log(response, "action");
    dispatch(slice.actions.getListMoviesPopularSuccess({ data: response.results, page }));
  } catch (error) {
    console.log(error);
  }
};
