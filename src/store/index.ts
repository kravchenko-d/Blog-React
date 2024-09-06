import { configureStore } from '@reduxjs/toolkit';
import articlesReducer from './slices/article';

export const store = configureStore({
  reducer: {
    articles: articlesReducer,
  },
});
