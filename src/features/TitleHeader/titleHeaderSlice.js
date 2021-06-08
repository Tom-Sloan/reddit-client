import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';

export const titleHeaderSlice = createSlice({
    name: 'titleHeader',
    initialState: {
        data:{
            columnNumber: 3 ,
            columnImg: [
                "/./resources/grid-icon_1.png",
                "/./resources/grid-icon_2.png",
                "/./resources/grid-icon_3.png",
                "/./resources/grid-icon_4.png",   
            ]
        }
    },
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        updateTitleHeader: (state) => {
            state.data = {
                ...state.data,
                columnNumber: state.data.columnNumber % 4 + 1,
            }
        },
    },
  });
  
// export const selectTitleHeaderJsonData = (state) => state.titleHeader.subjson;
export const {updateTitleHeader} = titleHeaderSlice.actions;
export const selectImageLink = (state) => state.titleHeader.data.columnImg[state.titleHeader.data.columnNumber-1];
export const selectColumnNumber= (state) => state.titleHeader.data.columnNumber ;

export default titleHeaderSlice.reducer;