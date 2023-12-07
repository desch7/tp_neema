import ImputationModel from "../models/ImputationModel.ts"

export const findAllImputationByInvoice = async (invoiceId) =>  {
    let imputation : any;
     await fetch(`${process.env.REACT_APP_BASE_ENDPOINT}/invoices/${invoiceId}/imputations`)
        .then(res => res.json())
         .then(resp => {
            console.log(' resp imputation by invoice Id => ', resp);
            
            imputation = resp
            console.log('imputation by invoice Id => ',imputation)
        })
        .catch(err => {
            console.log('error fetch all imputation by invoice Id=> ',err)
        })

    return imputation;
}

export const createImputations = async (imputation, InvoiceId) => {
    let message: string = ''
    
    await fetch(`${process.env.REACT_APP_BASE_ENDPOINT}/invoices/${InvoiceId}/imputations`,{
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(imputation),
    })
        .then((response) => {
        console.log('response in create imputation .then service=> ',response)
        if (response.ok) {
            
            message = 'OK'
        }
         })
    .catch((err) => {
        console.log('err createImputations =>',err)
    })


    return message
}
