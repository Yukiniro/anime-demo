import { configureStore } from '@reduxjs/toolkit';
import animeStateSlice from '../features/anime/animeSlice';

export default configureStore({
  reducer: {
    animeStore: animeStateSlice,
  },
});
