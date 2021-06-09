import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

export const commentSlice = createSlice({
    name: "comment",
    initialState: {
        isExpanded: false,
        text: ""
    },
    reducers: {
        updateComment: (state, action) => {
            state.text = action.payload;
        },
        updateExpansion: (state, action) => {
            state.isExpanded = !state.isExpanded;
        },
    },
});

export const { updateComment, updateExpansion } = commentSlice.actions;
export const selectComment = (state) => state.text;
export const selectExpanded = (state) => state.isExpanded;