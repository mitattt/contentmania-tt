import {configureStore} from '@reduxjs/toolkit';
import postsSlicer from './slices/postsSlicer';
import commentsSlicer from './slices/commentsSlicer';

export const store = configureStore({
  reducer: {
    posts: postsSlicer,
    comments: commentsSlicer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
