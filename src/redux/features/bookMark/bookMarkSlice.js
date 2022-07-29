import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  bookMarkMovies: [],
};

const slice = createSlice({
  name: 'bookMark',
  initialState,
  reducers: {
    pushMovieToBookMarkSuccess(state, action) {
      let movie = action.payload;
      let bookMark = state.bookMarkMovies;
      let existMovie = bookMark.find(
        movieBookMark => movieBookMark.id === movie.id,
      );
      if (existMovie) {
        let indexMovieExist = bookMark.findIndex(
          movieBookMark => movieBookMark.id === movie.id,
        );
        bookMark.splice(indexMovieExist, 1);
        state.bookMarkMovies = bookMark;
      } else {
        bookMark.push(movie);
        state.bookMarkMovies = bookMark;
      }
    },
  },
});

export default slice.reducer;

export const pushMovieToBookMark = movie => async dispatch => {
  await dispatch(slice.actions.pushMovieToBookMarkSuccess(movie));
};
