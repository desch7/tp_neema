import InvoiceModel from "../models/InvoiceModel.tsx"

export const controlFields = (newRows : InvoiceModel[], invoice : InvoiceModel) => {
    let goodInvoice : string= 'OK'
    if (newRows.filter(row =>row.tmcClientNumber === invoice.tmcClientNumber).length > 0) {
        goodInvoice = 'Fields TMC Client Number is already in use. Must be unique'
        
        return goodInvoice
    }
    if (newRows.filter(row =>row.terms === invoice.terms).length > 0) {
        goodInvoice = 'Fields Terms is already in use. Must be unique'
        
        return goodInvoice
    }
    if (newRows.filter(row =>row.alias === invoice.alias).length > 0) {
        goodInvoice = 'Fields Alias is already in use. Must be unique'
        
        return goodInvoice
    }
    if (newRows.filter(row =>row.abKey === invoice.abKey).length > 0) {
        goodInvoice = 'Fields Ab Key is already in use. Must be unique'

        return goodInvoice
    }

    return goodInvoice
} 