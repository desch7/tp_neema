import { createSlice } from "@reduxjs/toolkit";
import { createImputations, findAllImputationByInvoice } from "../Actions/imputation.action.ts";


const initialState = {
    allImputation: {},
    status: 'init', // 'init' | 'loading' | 'succeeded' | 'failed'
    error: '',
}



export const imputationSlice = createSlice(
    {
        name: 'imputation',
        initialState,
        reducers: {
            fecthImputationCompleted: {
                reducer(state, action) {
                    if (state.status === 'succeeded') {
                        state.status = action.payload;
                    }
                },
            },
        },
        extraReducers(builder) {
            builder
                .addCase(findAllImputationByInvoice.pending, (state, action) => {
                    state.status = 'loading';
                })
                .addCase(findAllImputationByInvoice.fulfilled, (state, action) => {
                    state.status = 'succeeded';
                    state.allImputation = action.payload;
                    state.error = ''
                })
                .addCase(findAllImputationByInvoice.rejected, (state, action) => {
                    state.status = 'failed';
                    state.error = action.error.message ? action.error.message : 'there is an error but error.message isn\'t defined';
                }).addCase(createImputations.fulfilled, (state, action) => {
                    console.log('action.payload in create imputation Slice=>', action.payload);
                    state.status = 'succeeded';
                    if (action.payload.status === 'OK') {
                        console.log(action.payload.msg);
                        state.error = ''
                    } else {
                        state.error = action.payload.msg
                    }

                })

        }

    }
)

export const selectAllImputations = (state) => state.imputation.allImputation
export const ImputationsStatus = (state) => state.imputation.status
export const ImputationsError = (state) => state.imputation.error

export const { fecthImputationCompleted } = imputationSlice.actions;

export default imputationSlice.reducer;