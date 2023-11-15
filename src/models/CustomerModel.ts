type CustomerModel = {
    id : number,
    customerName : string,
    street : string,           
    city : string,
    state : string,
    zipCode : string,
    notes : string,
    terms : number,
    accountNumber : string,
    isSubAgency : boolean
    language : string
    slug : number,
    agency : string,
    alias : string,
    abKey : string
    tmcClientNumber : string,
    idCurrency : number,
    idCountry : number,
    isActive : boolean,
}

export default CustomerModel