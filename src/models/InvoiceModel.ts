import TravelItems from "./TravelItems.ts"

type InvoiceModel = {
    id : number,
    invoice_number : string,
    idCustomer : number,           
    creationDate : string,
    dueDate : string,
    amount : number,
    status : string,
    balance : string,
    credit_apply : number,
    travelItems: TravelItems[],
}

export default InvoiceModel