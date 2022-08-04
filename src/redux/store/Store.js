import {configureStore} from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moviesNowPlayingReducer from '../features/movies/movieNowPlayingSlice';
import moviesPopularReducer from '../features/movies/moviePopularSlice';
import bookMarkReducer from "../features/bookMark/bookMarkSlice";

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const reducer = combineReducers({
  moviesNowPlaying: moviesNowPlayingReducer,
  moviesPopular: moviesPopularReducer,
  bookMark: bookMarkReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
