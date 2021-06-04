import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import {updateComments} from '../Comments/commentsSlice'

export const loadPosts = createAsyncThunk(
    'postSlice/loadPosts',
    async (payload, thunkAPI) => {

        const responses = await Promise.all(payload.map(url => fetch(url)))
        const jsons = await Promise.all(responses.map(response => response.json()))
        const postData = {};
        const commentData = [];
        jsons.forEach(elm => {
            postData[elm[0].data.children[0].data.id] = {
                id: elm[0].data.children[0].data.id,
                title: elm[0].data.children[0].data.title,
                ups: elm[0].data.children[0].data.ups,
                author: elm[0].data.children[0].data.author,
                img: elm[0].data.children[0].data.url
            }

            //to get children make this a recursive function
            commentData[elm[0].data.children[0].data.id] = elm[1].data.children.map(commentChunks => commentChunks.data.body)
        });

        thunkAPI.dispatch(updatePosts({data:postData}))
        thunkAPI.dispatch(updateComments({data:commentData}))
        return jsons;
        
    }
);

export const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        allPostData: {
            posts: {},
        },
        errorLoading: false,
        isLoading: false,
    },
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        updatePosts: (state, action) => {
            state.allPostData = {
                ...state.allPostData,
                posts: action.payload.data
            }

            console.log(state)
        },
        setErrorLoading: (state, action) => {
            state = {
                ...state,
                errorLoading: action.payload
            }
        },
        setIsLoading: (state, action) => {
            state = {
                ...state,
                isLoading: action.payload
            }
        },
    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    extraReducers: {
      
        [loadPosts.pending] : (state) => {
            console.log('post pending: ');
            state.isLoading=true;
            state.errorLoading=false;
        },
        [loadPosts.rejected] : (state, action) => {
            console.log('posts rejected: ');
            // console.log(current(state));
            // console.log(action)

            state.isLoading=false;
            state.errorLoading=true;
        },
        [loadPosts.fulfilled] : (state, action) => {
            
            console.log('posts accepted: ');
            // console.log(current(state));
            // console.log(action)  
            
            //No point changing the screen till the values have loaded into comments and posts
            state.isLoading=false;
            state.errorLoading=false;
        }
    },
});

export const selectPostsData = (state) => state.posts.allPostData;
export const isLoadingPosts = (state) => state.posts.isLoading;
export const failedToLoadPosts = (state) => state.posts.errorLoading;
export const selectAllPosts = (state) => state.posts.allPostData;
export const selectState = (state) => state;

export const {updatePosts, setErrorLoading, setIsLoading} = postsSlice.actions;

export default postsSlice.reducer;