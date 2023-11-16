
import { useEffect, useState } from 'react';
import React from 'react';
import { useForm } from "react-hook-form";
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createInvoice, updateInvoice } from '../../../../_service/invoice_service.ts';
import { controlFields } from '../../../../_Utils/InvoiceFieldsController.ts';
import InvoiceForms from './InvoiceForms.tsx';
import {
    GridRowSelectionModel, GridColDef, GridActionsCellItem,
  } from "@mui/x-data-grid";



export default function Invoice({ onNotifmodal, invoice, rows, msgSuccess}) {

    const columns: GridColDef[] = [
        { 
          field: "invoice_number",  headerName: "Invoice Number", 
          width: 200, align: 'left', headerAlign: 'left', 
        },
        { 
          field: "creationDate",  headerName: "Creation Date", 
          width: 150, align: 'left', headerAlign: 'left', 
        },
        {
          field: "dueDate", headerName: "Due Date", 
          width: 150, align: 'left', headerAlign: 'left',
        },
        {
          field: "amount", headerName: "Amount",
          width: 170, align: 'left', headerAlign: 'left',
        },
        {
          field: "balance", headerName: "Balance",
          width: 170, align: 'left', headerAlign: 'left',
        },
        {
          field: "credit_apply", headerName: "Apply Credit",
          width: 150, align: 'left', headerAlign: 'left',
        },
    
      ];

      const fakeRows = [  
        {
          id:0,
          invoice_number: "INV-001", //string (generated from backend)
          idCustomer:0, //integer
          creationDate:"2022-09-09", // date in this format
          dueDate:"2022-10-19", //date in this format,
          amount:10000.00, //float. ---> SUM of total price of all travel_item linked to invoice
          status:"", //string
          balance:0.00, //float
          credit_apply:0.00, //float
        }
      ]
      const [rowSelectionModel, setRowSelectionModel] = useState<
      GridRowSelectionModel
    >([]);
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
    <div>
        <InvoiceForms 
        modal={modal} handleClose={handleClose} 
        handleSubmit={handleSubmit} errors={errors}
        onSubmit={onSubmit} register = {register}
        listOptLang={listOptLang} loading={loading}
        listOptCustomer = {listOptLang} rows={fakeRows}
        invoice={invoice} columns={columns} checkboxSelection = {true}
        setRowSelectionModel = {setRowSelectionModel}
        />
    </div>
    
  );
}

