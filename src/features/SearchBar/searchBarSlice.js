import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';

export const searchBarSlice = createSlice({
    name: 'searchBar',
    initialState: {
        data:{
            searchTerm:''
        }
    },
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        updateSearchBar: (state) => {
            console.log(current(state))
            state.data = {
                ...state.data,
                columnNumber: state.data.columnNumber % 4 + 1,
            }
            console.log(current(state))
        },
    },
  });
  
// export const selectSearchBarJsonData = (state) => state.searchBar.subjson;
export const {updateSearchBar} = searchBarSlice.actions;
export const selectImageLink = (state) => state.searchBar.data.columnImg[state.searchBar.data.columnNumber-1];
export const selectColumnNumber= (state) => state.searchBar.data.columnNumber ;

export default searchBarSlice.reducer;