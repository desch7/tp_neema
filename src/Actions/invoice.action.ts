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

export const findInvoiceById = async (invoiceId) => {
    let Invoice : any = {};

     await fetch(`${process.env.REACT_APP_BASE_ENDPOINT}/invoices/${invoiceId}`)
        .then(res => res.json())
        .then(resp =>{
            Invoice = resp
            console.log('Invoice by id=> ',Invoice)
        })
        .catch(err => {
            console.log('error fetch invoice by id=> ',err)
        })

    return Invoice;
}

export const findAllInvoiceByCustomer = async (idCustomer, pageInfo?) =>  {
    let allInvoice : any[] = [];
    const url = pageInfo ? `?page=${pageInfo?.page}&page-size=${pageInfo?.pageSize}` : '';
     await fetch(`${process.env.REACT_APP_BASE_ENDPOINT}/customers/${idCustomer}/invoices${url}`)
        .then(res => res.json())
        .then(resp =>{
            allInvoice = resp.data.Invoices
            console.log('all Invoice by customer=> ',allInvoice)
        })
        .catch(err => {
            console.log('error fetch all Invoice by customer=> ',err)
        })

    return allInvoice;
}


export  const deleteInvoice = async (idInvoice: number) =>{
    let message : string = '';
    await fetch(`${process.env.REACT_APP_BASE_ENDPOINT}/invoices/` + idInvoice,
        {
            method: 'DELETE',
        }
    ).then(response => {
        console.log(response)
            if (response.ok) {
                message = 'OK'
            }
    }).catch(err => {
                console.log('err deleteInvoice =>',err)
            }
    )

    return message
}


export const updateInvoice = async (invoice : InvoiceModel) => {
    let message : string = '';
    await fetch(`${process.env.REACT_APP_BASE_ENDPOINT}/invoices/${invoice.id}` ,{
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(invoice),
    })
    .then((response) => {
        if (response.ok) {
            message = 'OK'
        }
         })
    .catch((err) => {
        console.log('err updateInvoice=>',err)
    })

    return message
}




        