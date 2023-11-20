import CustomerModel from "../models/CustomerModel.ts"

export const findAllCustomer = async (pageInfo?:any) =>  {
    let allCustomer : CustomerModel[] = [];

     await fetch(`${process.env.REACT_APP_BASE_ENDPOINT}/customers?page=${pageInfo?.page}&page-size=${pageInfo?.pageSize}`)
        .then(res => res.json())
        .then(data =>{
            allCustomer = data.data
            console.log('allCustomer => ',allCustomer)
        })
        .catch(err => {
            console.log('error fetch all customer=> ',err)
        })

    return allCustomer;
}


export const findCustomerById = async (customerId : any) =>  {
    let customer ;

     await fetch(`${process.env.REACT_APP_BASE_ENDPOINT}/customers/${customerId}`)
        .then(res => res.json())
        .then(data =>{
            customer = data
            console.log('customer by id => ',customer)
        })
        .catch(err => {
            console.log('error fetch customer by id=> ',err)
        })

    return customer;
}

export  const deleteCustomer = async (idCustomer: number) =>{
    let message : string = '';
    await fetch(`${process.env.REACT_APP_BASE_ENDPOINT}/customers/${idCustomer}`,
        {
            method: 'DELETE',
        }
    ).then(response => {
        console.log(response)
            if (response.ok) {
                message = 'OK'
            }
    }).catch(err => {
                console.log('err deleteCustomer =>',err)
            }
    )

    return message
}


export const updateCustomer = async (customer : CustomerModel) => {
    let message : string = '';
    await fetch(`${process.env.REACT_APP_BASE_ENDPOINT}/customers/${customer.id}`,{
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(customer),
    })
    .then((response) => {
        if (response.ok) {
            message = 'OK'
        }
         })
    .catch((err) => {
        console.log('err updateCustomer=>',err)
    })

    return message
}


export const createCustomer = async (customer : CustomerModel) => {
    let message : string = ''
    await fetch(`${process.env.REACT_APP_BASE_ENDPOINT}/customers`,{
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(customer),
    })
    .then((response) => {
        if (response.ok) {
            message = 'OK'
        }
         })
    .catch((err) => {
        console.log('err createCustomer=>',err)
    })


    return message
}

        