import PaymentModel from "../models/PaymentModel.tsx"

export const controlFields = (newRows : PaymentModel[], payment : PaymentModel) => {
    let goodPayment : string= 'OK'
    if (newRows.filter(row =>row.tmcClientNumber === payment.tmcClientNumber).length > 0) {
        goodPayment = 'Fields TMC Client Number is already in use. Must be unique'
        
        return goodPayment
    }
    if (newRows.filter(row =>row.terms === payment.terms).length > 0) {
        goodPayment = 'Fields Terms is already in use. Must be unique'
        
        return goodPayment
    }
    if (newRows.filter(row =>row.alias === payment.alias).length > 0) {
        goodPayment = 'Fields Alias is already in use. Must be unique'
        
        return goodPayment
    }
    if (newRows.filter(row =>row.abKey === payment.abKey).length > 0) {
        goodPayment = 'Fields Ab Key is already in use. Must be unique'

        return goodPayment
    }

    return goodPayment
} 