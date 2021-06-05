import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';

export const titleHeaderSlice = createSlice({
    name: 'titleHeader',
    initialState: {
        columnNumber: 1 ,
        columnImg: [

        ]

    },
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        updateTitleHeader: (state) => {
            state = {
                ...state,
                columnNumber: state.columnNumber % 5 + 1
            }
        },
    },
  });
  
// export const selectTitleHeaderJsonData = (state) => state.titleHeader.subjson;
export const {updateTitleHeader} = titleHeaderSlice.actions;
export const selectImageLink = (state) => state.titleHeader.columnImg[state.titleHeader.columnNumber-1];

export default titleHeaderSlice.reducer;