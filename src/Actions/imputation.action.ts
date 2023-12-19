import { createAsyncThunk } from "@reduxjs/toolkit";

export const FIND_ALLIMPUTATION_BY_INVOICE = 'FIND_ALLIMPUTATION_BY_INVOICE'
export const CREATE_IMPUTATION = 'CREATE_IMPUTATION'

type creationImputation =
    {
        invoiceId: number,
        imputTab: any[],
    }

export const findAllImputationByInvoice = createAsyncThunk(FIND_ALLIMPUTATION_BY_INVOICE, async (invoiceId : number) =>
    {
    try {
        const result = await fetch(`${process.env.REACT_APP_BASE_ENDPOINT}/invoices/${invoiceId}/imputations`)
        const response = await result.json();
        console.log(' resp imputation by invoice Id => ', response);
        return response
    } catch (error) {
        console.log('error fetch all imputation by invoice Id=> ', error)
        return error.message;
    }
     
})


export const createImputations = createAsyncThunk(CREATE_IMPUTATION, async (imputation:creationImputation) => 
    {
    try {
        const result =  await fetch(`${process.env.REACT_APP_BASE_ENDPOINT}/invoices/${imputation.invoiceId}/imputations`,{
                                    method: 'POST',
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify(imputation.imputTab),
        }
        )
        const response = await result.json();
        console.log('response in create imputation .then service=> ', response)
        if (response.hasOwnProperty('error')) {
                return { status: 'KO', msg: response.error }
            }
            return { status: 'OK', msg: 'Imputation created' }
    } catch (error) {
        console.log('error in imputation .then createimputation=> ', error);
            return error.message;
        
    }
    
})
