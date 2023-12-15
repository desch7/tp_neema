import { createSlice } from "@reduxjs/toolkit"
import { createInvoice, findAllInvoices } from "../Actions/invoice.action.ts";

// interface initialStateInter{
//     allInvoices: {
//         data: InvoiceModel[],
//         totalRowCount: number,
//     },
//     status: string, // 'init' | 'loading' | 'succeeded' | 'failed'
//     error: string,
// }

const initialState = {
    allInvoices: {
        data: [],
        totalRowCount: 0,
    },
    status: 'init', // 'init' | 'loading' | 'succeeded' | 'failed'
    error: '',
}

export const invoiceSlice = createSlice(
    {
        name: 'invoice',
        initialState,
        reducers: {

        },
        extraReducers(builder) {
            builder
                .addCase(findAllInvoices.pending, (state, action) => {
                    state.status = 'loading';
                })
                .addCase(findAllInvoices.fulfilled, (state, action) => {
                    state.status = 'succeeded';
                    state.allInvoices.data = action.payload.data;
                    state.allInvoices.totalRowCount = action.payload.totalRowCount;
                    state.error = ''
                })
                .addCase(findAllInvoices.rejected, (state, action) => {
                    state.status = 'failed';
                    state.error = action.error.message ? action.error.message : 'there is an error but error.message isn\'t defined';
                })
                .addCase(createInvoice.fulfilled, (state, action) => {
                    console.log('action.payload in createInvoice Slice=>', action.payload);
                    if (action.payload.status === 'OK') {
                        state.allInvoices.data.push(action.payload.msg);
                        state.error = ''
                    } else {
                        state.error = action.payload.msg
                    }

                })
        }

    }
)

export const selectAllInvoices = (state) => state.invoice.allInvoices
export const InvoicesStatus = (state) => state.invoice.status
export const InvoicesError = (state) => state.invoice.error

//export const { } = invoiceSlice.actions;

export default invoiceSlice.reducer;