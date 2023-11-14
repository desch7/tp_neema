import CustomerModel from "../models/CustomerModel.tsx"

export const controlFields = (newRows : CustomerModel[], customer : CustomerModel) => {
    let goodCustomer : string= 'OK'
    if (newRows.filter(row =>row.tmcClientNumber === customer.tmcClientNumber).length > 0) {
        goodCustomer = 'Fields TMC Client Number is already in use. Must be unique'
        
        return goodCustomer
    }
    if (newRows.filter(row =>row.terms === customer.terms).length > 0) {
        goodCustomer = 'Fields Terms is already in use. Must be unique'
        
        return goodCustomer
    }
    if (newRows.filter(row =>row.alias === customer.alias).length > 0) {
        goodCustomer = 'Fields Alias is already in use. Must be unique'
        
        return goodCustomer
    }
    if (newRows.filter(row =>row.abKey === customer.abKey).length > 0) {
        goodCustomer = 'Fields Ab Key is already in use. Must be unique'

        return goodCustomer
    }

    return goodCustomer
} 