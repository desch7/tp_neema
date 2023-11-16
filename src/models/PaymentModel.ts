type PaymentModel = {
    id:number,
    paymentNumber: string, //string (generated from backend)
    idCustomer:number, //integer
    paymentDate:string, // date in this format
    paymentMode:string, //date in this format,
    amount:number, //float. ---> SUM of total price of all travel_item linked to invoice
    balance:number, //string
    usedAmount:number, //float
    status:string, //float
}

export default PaymentModel