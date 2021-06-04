import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';

export const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        comments: {
            comments: {}
        },

    },
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        updateComments: (state, action) => {
            console.log('\n\nInside updateCommetns\n\n')
            console.log('UpdateComments')
            console.log(current(state))
            console.log(action)
            state.comments = {
                ...state.comments,
                comments: action.payload.data
            }
        }
    },
  });
  
// export const selectCommentsJsonData = (state) => state.comments.subjson;
export const {updateComments} = commentsSlice.actions


export default commentsSlice.reducer;