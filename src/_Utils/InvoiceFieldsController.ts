import InvoiceModel from "../models/InvoiceModel.ts"

export const controlFields = (invoice : InvoiceModel, rows? : any[]) => {
    let goodInvoice : string= 'OK'
    if (invoice.idCustomer === null || invoice.idCustomer === -1) {
        goodInvoice = 'Customer Account must be provided'
        return goodInvoice
      }
    if (rows?.length === 0) {
        goodInvoice = 'You must choose at least one travel items'
        
        return goodInvoice
    }

    return goodInvoice
} 