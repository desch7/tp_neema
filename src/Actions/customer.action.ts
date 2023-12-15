import { createAsyncThunk } from "@reduxjs/toolkit";
import CustomerModel from "../models/CustomerModel.ts";

type donnee = {
    data: CustomerModel[],
    totalRowCount : number,
}
type pageInfoType = {
    page: number,
    pageSize : number,
}

export const FIND_ALLCUSTOMER = 'FIND_ALLCUSTOMER'
export const findAllCustomers = createAsyncThunk(FIND_ALLCUSTOMER, async (pageInfo?: pageInfoType) =>
    {
    let allCustomer: donnee = {
            data: [],
            totalRowCount: 0,
        };

    const params = pageInfo ? `?page=${pageInfo.page}&page-size=${pageInfo.pageSize}` : ''
    try {
        const result = await fetch(`${process.env.REACT_APP_BASE_ENDPOINT}/customers${params}`)
        const response = await result.json()
        allCustomer.data = response.data
        allCustomer.totalRowCount = response.totalRowCount
        console.log('allCustomer in action file => ', allCustomer)
        return allCustomer;
    } catch (error) {
        console.log('error in customer .then all customer=> ', error);
        return error.message;
    }

})