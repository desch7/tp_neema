
import { useEffect, useState } from 'react';
import React from 'react';
import { useForm } from "react-hook-form";
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createCustomer, updateCustomer } from '../../../../_service/customer_service.ts';
import CustomerForms from './CustomerForms.tsx';
import { controlFields } from '../../../../_Utils/CustomerFieldsController.ts';



export default function Customer({ onNotifmodal, customer, rows, msgSuccess}) {

   const [modal, setModal] = useState(true)
   const [loading, setLoading] = useState(false)

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

    const { register, handleSubmit, setValue, formState:{ errors }} = useForm();

    const onSubmit =  (data:any) => {
        setLoading(true)
        data.idCurrency = 272
        data.slug = parseInt(data.slug)
        data.terms = parseInt(data.terms)
        data.idCountry = 2
        data.isActive = false
        data.isSubAgency = data.isSubAgency? data.isSubAgency : false;
        console.log(JSON.stringify(data))
        if (customer) {
            // Update customer
            const newRows = rows.filter(row =>row.id !== customer.id)
            const fieldsCheck = controlFields(newRows, data)
            if (fieldsCheck !== 'OK') {
                toast.error(fieldsCheck,
                    {position: toast.POSITION.TOP_CENTER})
                
                setLoading(false)
                return
            }
            updateCustomer(data)
            .then((response) => {
                if (response === 'OK') {  
                    msgSuccess('Customer was updated successfully')
                    setModal(false)
                    onNotifmodal(false)
                }else{
                    toast.error('The server is not available or something went wrong!',
                    {position: toast.POSITION.TOP_CENTER})
                    setLoading(false)
                }
                 })

        }else{
            //insert customer
            const fieldsCheck = controlFields(rows, data)
            if (fieldsCheck !== 'OK') {
                toast.error(fieldsCheck,
                    {position: toast.POSITION.TOP_CENTER})
                
                setLoading(false)
                return
            }
            createCustomer(data)
            .then((response) => {
                if (response === 'OK') {  
                    msgSuccess('Customer was created successfully')
                    setModal(false)
                    onNotifmodal(false)
                }else{
                    toast.error('The server is not available or something went wrong!',
                    {position: toast.POSITION.TOP_CENTER})
                    setLoading(false)
                }
                 })
        }

    };

    useEffect(() => {
        if (customer) {
            setValue("customerName", customer.customerName)
            setValue("street", customer.street)            
            setValue("city", customer.city)
            setValue("state", customer.state)
            setValue("zipCode", customer.zipCode)
            setValue("notes", customer.notes)
            setValue("terms", customer.terms)
            setValue("accountNumber", customer.accountNumber)
            setValue("isSubAgency", customer.isSubAgency)
            setValue("language", customer.language)
            setValue("slug", customer.slug)
            setValue("agency", customer.agency)
            setValue("alias", customer.alias)
            setValue("abKey", customer.abKey)
            setValue("tmcClientNumber", customer.tmcClientNumber)           
        }
    }, [customer])


  return (
    <CustomerForms 
      modal={modal} handleClose={handleClose} 
      handleSubmit={handleSubmit} errors={errors}
      onSubmit={onSubmit} register = {register}
      listOptLang={listOptLang} loading={loading} 
      customer={customer}
    />
  );
}

