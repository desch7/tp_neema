
import { useEffect, useState } from 'react';
import React from 'react';
import { useForm } from "react-hook-form";
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createInvoice, updateInvoice } from '../../../../_service/invoice_service.tsx';
import { controlFields } from '../../../../_Utils/InvoiceFieldsController.ts';
import InvoiceForms from './InvoiceForms.tsx';



export default function Invoice({ onNotifmodal, invoice, rows, msgSuccess}) {

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
        if (invoice) {
            // Update invoice
            const newRows = rows.filter(row =>row.id !== invoice.id)
            const fieldsCheck = controlFields(newRows, data)
            if (fieldsCheck !== 'OK') {
                toast.error(fieldsCheck,
                    {position: toast.POSITION.TOP_CENTER})
                
                setLoading(false)
                return
            }
            updateInvoice(data)
            .then((response) => {
                if (response === 'OK') {  
                    msgSuccess('Invoice was updated successfully')
                    setModal(false)
                    onNotifmodal(false)
                }else{
                    toast.error('The server is not available or something went wrong!',
                    {position: toast.POSITION.TOP_CENTER})
                    setLoading(false)
                }
                 })

        }else{
            //insert invoice
            const fieldsCheck = controlFields(rows, data)
            if (fieldsCheck !== 'OK') {
                toast.error(fieldsCheck,
                    {position: toast.POSITION.TOP_CENTER})
                
                setLoading(false)
                return
            }
            createInvoice(data)
            .then((response) => {
                if (response === 'OK') {  
                    msgSuccess('Invoice was created successfully')
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
        if (invoice) {
            setValue("invoiceName", invoice.invoiceName)
            setValue("street", invoice.street)            
            setValue("city", invoice.city)
            setValue("state", invoice.state)
            setValue("zipCode", invoice.zipCode)
            setValue("notes", invoice.notes)
            setValue("terms", invoice.terms)
            setValue("accountNumber", invoice.accountNumber)
            setValue("isSubAgency", invoice.isSubAgency)
            setValue("language", invoice.language)
            setValue("slug", invoice.slug)
            setValue("agency", invoice.agency)
            setValue("alias", invoice.alias)
            setValue("abKey", invoice.abKey)
            setValue("tmcClientNumber", invoice.tmcClientNumber)           
        }
    }, [invoice])


  return (
    <InvoiceForms 
      modal={modal} handleClose={handleClose} 
      handleSubmit={handleSubmit} errors={errors}
      onSubmit={onSubmit} register = {register}
      listOptLang={listOptLang} loading={loading} 
      invoice={invoice}
    />
  );
}

