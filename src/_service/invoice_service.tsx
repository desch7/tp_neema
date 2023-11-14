import InvoiceModel from "../models/InvoiceModel"

export const findAllInvoice = async () =>  {
    let allInvoice : InvoiceModel[] = [];

     await fetch(`${process.env.REACT_APP_BASE_ENDPOINT}/invoices`)
        .then(res => res.json())
        .then(data =>{
            allInvoice = data
            console.log('allInvoice => ',allInvoice)
        })
        .catch(err => {
            console.log('error fetch all invoice=> ',err)
        })

    return allInvoice;
}


export  const deleteInvoice = async (idInvoice: number) =>{
    let message : string = '';
    await fetch(`${process.env.REACT_APP_BASE_ENDPOINT}/invoices/` + idInvoice,
        {
            method: 'DELETE',
        }
    ).then(response => {
        console.log(response)
            if (response.ok) {
                message = 'OK'
            }
    }).catch(err => {
                console.log('err deleteInvoice =>',err)
            }
    )

    return message
}


export const updateInvoice = async (invoice : InvoiceModel) => {
    let message : string = '';
    await fetch(`${process.env.REACT_APP_BASE_ENDPOINT}/invoices/` + invoice.id,{
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(invoice),
    })
    .then((response) => {
        if (response.ok) {
            message = 'OK'
        }
         })
    .catch((err) => {
        console.log('err updateInvoice=>',err)
    })

    return message
}


export const createInvoice = async (invoices : InvoiceModel) => {
    let message : string = ''
    await fetch(`${process.env.REACT_APP_BASE_ENDPOINT}/invoices`,{
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(invoices),
    })
    .then((response) => {
        if (response.ok) {
            message = 'OK'
        }
         })
    .catch((err) => {
        console.log('err createInvoices=>',err)
    })


    return message
}

        