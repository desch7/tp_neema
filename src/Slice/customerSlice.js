import { createSlice } from "@reduxjs/toolkit"
import { findAllCustomers } from "../Actions/customer.action.ts";


const initialState = {
    customers: {
        data: [],
        totalRowCount: 0,
    },
    status: 'init', // 'init' | 'loading' | 'succeeded' | 'failed'
    error: '',
}



export const customerSlice = createSlice(
    {
        name: 'customer',
        initialState,
        reducers: {

        },
        extraReducers(builder) {
            builder
                .addCase(findAllCustomers.pending, (state, action) => {
                    state.status = 'loading';
                })
                .addCase(findAllCustomers.fulfilled, (state, action) => {
                    state.status = 'succeeded';
                    state.customers.data = action.payload.data;
                    state.customers.totalRowCount = action.payload.totalRowCount;
                    state.error = ''
                })
                .addCase(findAllCustomers.rejected, (state, action) => {
                    state.status = 'failed';
                    state.error = action.error.message ? action.error.message : 'there is an error but error.message isn\'t defined';
                })

        }

    }
)

export const selectAllCustomers = (state) => state.customer.customers
export const CustomersStatus = (state) => state.customer.status
export const CustomersError = (state) => state.customer.error

//export const { } = invoiceSlice.actions;

export default customerSlice.reducer;