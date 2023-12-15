//import InvoiceModel from "../models/InvoiceModel.ts"

import InvoiceModel from "../models/InvoiceModel.ts";

type donnee = {
    data: InvoiceModel[],
    totalRowCount : number,
}

export const findAllInvoice = async (pageInfo?) =>  {
    let allInvoice: donnee = {
        data: [],
        totalRowCount: 0,
    };
    let param = pageInfo? `?page=${pageInfo.page}&page-size=${pageInfo.pageSize}` : ''

     await fetch(`${process.env.REACT_APP_BASE_ENDPOINT}/invoices${param}`)
        .then(res => res.json())
        .then(resp =>{
            allInvoice.data = resp.data
            allInvoice.totalRowCount = resp.totalRowCount
            console.log('allInvoice => ',allInvoice)
        })
        .catch(err => {
            console.log('error fetch all invoice=> ',err)
        })

    return allInvoice;
}

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


export const createInvoices = async (invoices : InvoiceModel) => {
    console.log('JSON.stringify(invoices) =>', JSON.stringify(invoices));
    try {
        const result = await fetch(`${process.env.REACT_APP_BASE_ENDPOINT}/invoices`,{
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(invoices),
        }
        )
    const response = await result.json();
        console.log('response in invoice .then createInvoice=> ', response);
        if (!response?.success) {
            return {status: 'KO', msg: response.error}   
        }
        return {status: 'OK', msg: response} 
    } catch (error) {
        console.log('error in invoice .then createInvoice=> ',error);
    }

    
}

        