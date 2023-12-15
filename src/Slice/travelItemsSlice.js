import { createSlice } from "@reduxjs/toolkit"
import { findAllTravelItems } from "../Actions/travelItems.actions.ts";


const initialState = {
    allTravelItems: {
        data: [],
        totalRowCount: 0,
    },
    status: 'init', // 'init' | 'loading' | 'succeeded' | 'failed'
    error: '',
}



export const travelItemsSlice = createSlice(
    {
        name: 'travelItems',
        initialState,
        reducers: {

        },
        extraReducers(builder) {
            builder
                .addCase(findAllTravelItems.pending, (state, action) => {
                    state.status = 'loading';
                })
                .addCase(findAllTravelItems.fulfilled, (state, action) => {
                    state.status = 'succeeded';
                    state.allTravelItems.data = action.payload.data;
                    state.allTravelItems.totalRowCount = action.payload.totalRowCount;
                    state.error = ''
                })
                .addCase(findAllTravelItems.rejected, (state, action) => {
                    state.status = 'failed';
                    state.error = action.error.message ? action.error.message : 'there is an error but error.message isn\'t defined';
                })

        }

    }
)

export const selectAllTravelItems = (state) => state.travelItems.allTravelItems
export const travelItemsStatus = (state) => state.travelItems.status
export const travelItemsError = (state) => state.travelItems.error

//export const { } = invoiceSlice.actions;

export default travelItemsSlice.reducer;