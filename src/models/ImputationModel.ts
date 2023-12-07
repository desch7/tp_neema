type payment = {
    id : number,
    paymentNumber : string,
    amount : number,
    balance: number,
    paymentDate: string,
}

type imputations = {
    payment : payment,
    amountApplied : number,
}

type ImputationModel = {
    idInvoice: number,
    invoiceAmount: number,
    imputations : imputations[], 
}

export default ImputationModel;