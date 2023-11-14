
import { useEffect, useState } from 'react';
import React from 'react';
import { useForm } from "react-hook-form";
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createPayment, updatePayment } from '../../../../_service/payment_service.tsx';
import PaymentForms from './PaymentForms.tsx';
import { controlFields } from '../../../../_Utils/PaymentFieldsController.tsx';



export default function Payment({ onNotifmodal, payment, rows, msgSuccess}) {

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
        if (payment) {
            // Update payment
            const newRows = rows.filter(row =>row.id !== payment.id)
            const fieldsCheck = controlFields(newRows, data)
            if (fieldsCheck !== 'OK') {
                toast.error(fieldsCheck,
                    {position: toast.POSITION.TOP_CENTER})
                
                setLoading(false)
                return
            }
            updatePayment(data)
            .then((response) => {
                if (response === 'OK') {  
                    msgSuccess('Payment was updated successfully')
                    setModal(false)
                    onNotifmodal(false)
                }else{
                    toast.error('The server is not available or something went wrong!',
                    {position: toast.POSITION.TOP_CENTER})
                    setLoading(false)
                }
                 })

        }else{
            //insert payment
            const fieldsCheck = controlFields(rows, data)
            if (fieldsCheck !== 'OK') {
                toast.error(fieldsCheck,
                    {position: toast.POSITION.TOP_CENTER})
                
                setLoading(false)
                return
            }
            createPayment(data)
            .then((response) => {
                if (response === 'OK') {  
                    msgSuccess('Payment was created successfully')
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
        if (payment) {
            setValue("paymentName", payment.paymentName)
            setValue("street", payment.street)            
            setValue("city", payment.city)
            setValue("state", payment.state)
            setValue("zipCode", payment.zipCode)
            setValue("notes", payment.notes)
            setValue("terms", payment.terms)
            setValue("accountNumber", payment.accountNumber)
            setValue("isSubAgency", payment.isSubAgency)
            setValue("language", payment.language)
            setValue("slug", payment.slug)
            setValue("agency", payment.agency)
            setValue("alias", payment.alias)
            setValue("abKey", payment.abKey)
            setValue("tmcClientNumber", payment.tmcClientNumber)           
        }
    }, [payment])


  return (
    <PaymentForms 
      modal={modal} handleClose={handleClose} 
      handleSubmit={handleSubmit} errors={errors}
      onSubmit={onSubmit} register = {register}
      listOptLang={listOptLang} loading={loading} 
      payment={payment}
    />
  );
}

