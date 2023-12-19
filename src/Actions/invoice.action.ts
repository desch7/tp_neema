import { createAsyncThunk } from "@reduxjs/toolkit";
import InvoiceModel from "../models/InvoiceModel.ts";

type donnee = {
    data: InvoiceModel[],
    totalRowCount : number,
}
type pageInfoType = {
    page: number,
    pageSize : number,
}

export const FIND_ALLINVOICE = 'FIND_ALLINVOICE'
export const CREATE_INVOICE = 'CREATE_INVOICE'

export const findAllInvoices = createAsyncThunk(FIND_ALLINVOICE, async (pageInfo?: pageInfoType) =>
    {
        let allInvoice: donnee = {
            data: [],
            totalRowCount: 0,
        };
        let param = pageInfo ? `?page=${pageInfo.page}&page-size=${pageInfo.pageSize}` : ''
        try {
            const result = await fetch(`${process.env.REACT_APP_BASE_ENDPOINT}/invoices${param}`)
            const response = await result.json();
            allInvoice.data = response.data
            allInvoice.totalRowCount = response.totalRowCount
            console.log('allInvoice => ', allInvoice)
            return allInvoice;
        } catch (error) {
            console.log('error in invoice .then find all invoices=> ', error);
            return error.message;
        }
    }
)

export const createInvoice = createAsyncThunk(CREATE_INVOICE, async (invoices : InvoiceModel) =>
    {
    
        try {
            const result = await fetch(`${process.env.REACT_APP_BASE_ENDPOINT}/invoices`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(invoices),
            }
            )
            const response = await result.json();
            console.log('response in invoice .then createInvoice=> ', response);
            if (response.hasOwnProperty('id')) {
                return { status: 'OK', msg: response };
            }
            return { status: 'KO', msg: response.error }
            //return { status: 'OK', msg: response } ;
        } catch (error) {
            console.log('error in invoice .then createInvoice=> ', error);
            return error.message;
        }
    
    }
)






        