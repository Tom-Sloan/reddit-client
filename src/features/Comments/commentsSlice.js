import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

export const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    comments: {},
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    updateComments: (state, action) => {
      state.comments = {
        ...state.comments,
        [action.payload.subredditName]: action.payload.data,
      };
    },
  },
});

// export const selectCommentsJsonData = (state) => state.comments.subjson;
export const { updateComments } = commentsSlice.actions;
export const selectComments = (state) =>
  state.comments.comments[state.subreddit.subjson.currentSubredditName] || {};

export default commentsSlice.reducer;
