
import { useEffect, useState } from 'react';
import React from 'react';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createCustomer, findCustomerById, updateCustomer } from '../../../../_service/customer_service.ts';
import CustomerForms from './CustomerForms.tsx';
import CustomerModel from '../../../../models/CustomerModel.tsx';



export default function Customer({ onNotifmodal, customerId, msgSuccess }) {

    const [modal, setModal] = useState(true)
    const [loading, setLoading] = useState(false)
    const [customer, setCustomer] = useState<CustomerModel>()

    const handleClose = () => {
        setModal(false)
        onNotifmodal(false)
    }

    interface optionsLanguage {
        label: string,
        value: string,
    }

    const listOptLang: optionsLanguage[] = [
        {
            label: 'Francais',
            value: 'fr'
        },
        {
            label: 'English',
            value: 'en'
        }
    ]

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    const onSubmit = (data: any) => {
        setLoading(true)
        console.log(JSON.stringify(data))
        if (customerId) {
            // Update customer
            updateCustomer(data)
                .then((response) => {
                    if (response === 'OK') {
                        msgSuccess('Customer was updated successfully')
                        setModal(false)
                        onNotifmodal(false)
                    } else {
                        toast.error('The server is not available or something went wrong!',
                            { position: toast.POSITION.TOP_CENTER })
                        setLoading(false)
                    }
                })

        } else {
            //insert customer
            createCustomer(data)
                .then((response) => {
                    if (response === 'OK') {
                        msgSuccess('Customer was created successfully')
                        setModal(false)
                        onNotifmodal(false)
                    } else {
                        toast.error('The server is not available or something went wrong!',
                            { position: toast.POSITION.TOP_CENTER })
                        setLoading(false)
                    }
                })
        }

    };

    useEffect(() => {
        if (customerId) {
            findCustomerById(customerId).then((customer) => setCustomer(customer))
            setValue("customerName", customer?.customerName)
            setValue("state", customer?.state)
            setValue("accountNumber", customer?.accountNumber)
            setValue("alias", customer?.alias)
            setValue("tmcClientNumber", customer?.tmcClientNumber)
        }
    }, [customerId])


    return (
        <CustomerForms
            modal={modal} handleClose={handleClose}
            handleSubmit={handleSubmit} errors={errors}
            onSubmit={onSubmit} register={register}
            listOptLang={listOptLang} loading={loading}
            customer={customer} customerId={customerId}
        />
    );
}

