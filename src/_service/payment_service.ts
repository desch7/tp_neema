import PaymentModel from "../models/PaymentModel.ts"

export const findAllPayment = async ({page, pageSize}) =>  {
    let allPayment : PaymentModel[] = [];

     await fetch(`${process.env.REACT_APP_BASE_ENDPOINT}/payments?page=${page}&page-size=${pageSize}`)
        .then(res => res.json())
        .then(resp =>{
            allPayment = resp.data
            console.log('allPayment => ',allPayment)
        })
        .catch(err => {
            console.log('error fetch all payment=> ',err)
        })

    return allPayment;
}


export  const deletePayment = async (idPayment: number) =>{
    let message : string = '';
    await fetch(`${process.env.REACT_APP_BASE_ENDPOINT}/payments/${idPayment}` ,
        {
            method: 'DELETE',
        }
    ).then(response => {
        console.log(response)
            if (response.ok) {
                message = 'OK'
            }
    }).catch(err => {
                console.log('err deletePayment =>',err)
            }
    )

    return message
}


export const updatePayment = async (payment : PaymentModel) => {
    let message : string = '';
    await fetch(`${process.env.REACT_APP_BASE_ENDPOINT}/payments/${payment.id}`,{
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payment),
    })
    .then((response) => {
        if (response.ok) {
            message = 'OK'
        }
         })
    .catch((err) => {
        console.log('err updatePayment=>',err)
    })

    return message
}


export const createPayment = async (payments : PaymentModel) => {
    let message : string = ''
    await fetch(`${process.env.REACT_APP_BASE_ENDPOINT}/payments`,{
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payments),
    })
    .then((response) => {
        if (response.ok) {
            message = 'OK'
        }
         })
    .catch((err) => {
        console.log('err createPayments=>',err)
    })


    return message
}

export const findPaymentById = async (paymentId : number) => {
    let payment : any = {}
    await fetch(`${process.env.REACT_APP_BASE_ENDPOINT}/payments/${paymentId}`)
    .then(res => res.json())
        .then(resp =>{
            payment = resp
            console.log('Payment by id => ',payment)
        })
        .catch(err => {
            console.log('error fetch Payment by id=> ',err)
        })


    return payment
}

        