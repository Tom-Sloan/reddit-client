import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import postsReducer from '../features/Posts/postSlice';
import subredditReducer from '../features/Subreddit/subredditSlice'
import commentsReducer from '../features/Comments/commentsSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts:postsReducer,
    subreddit: subredditReducer,
    comments: commentsReducer,
  },
});
