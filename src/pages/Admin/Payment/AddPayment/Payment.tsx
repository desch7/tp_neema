
import { useEffect, useState } from 'react';
import React from 'react';
import { useForm } from "react-hook-form";
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createPayment, selectPayment, updatePayment } from '../../../../_service/payment_service.ts';
import PaymentForms from './PaymentForms.tsx';
import {
    GridRowSelectionModel, GridColDef, GridActionsCellItem,
  } from "@mui/x-data-grid";
import { findAllCustomer } from '../../../../_service/customer_service.ts';
//import CustomerModel from '../../../../models/CustomerModel.ts';
import { CreationSelectionList } from '../../../../_Utils/CreationSelectionList.ts';
import PaymentModel from '../../../../models/PaymentModel.ts';
import InvoiceModel from '../../../../models/InvoiceModel.ts';
import { findAllInvoiceByCustomer } from '../../../../_service/invoice_service.ts';



export default function Payment({ onNotifmodal, paymentId, msgSuccess}) {

    const columns: GridColDef[] = [
        { 
          field: "invoice_number",  headerName: "Invoice Number", 
          width: 180, align: 'left', headerAlign: 'left', 
        },
        { 
          field: "creationDate",  headerName: "Creation Date", 
          width: 220, align: 'left', headerAlign: 'left', 
        },
        {
          field: "dueDate", headerName: "Due Date", 
          width: 220, align: 'left', headerAlign: 'left',
        },
        {
          field: "amount", headerName: "Amount",
          width: 210, align: 'left', headerAlign: 'left',
        },
        {
          field: "balance", headerName: "Balance",
          width: 210, align: 'left', headerAlign: 'left',
        },
        {
          field: "credit_apply", headerName: "Apply Credit",
          width: 210, align: 'left', headerAlign: 'left',
        }
      ];
      const [rowSelectionModel, setRowSelectionModel] = useState<
      GridRowSelectionModel
    >([]);
   const [modal, setModal] = useState(true)
   const [loading, setLoading] = useState(false)
   const [payment, setPayment] = useState<PaymentModel>()
   const [invoiceByCustomer, setInvoiceByCustomer] = useState<InvoiceModel[]>([])
   const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 25,
  });

  const handleClose = () => { 
    setModal(false)
    onNotifmodal(false)
  }

  interface optionsSelect {
    label: string,
    value: string,
}

const listOptpayMode: optionsSelect[] = [
    {
        label: 'cash',
        value: 'cash'
    },
    {
        label: 'check',
        value: 'check'
    },
    {
        label: 'bank_tranfer',
        value: 'bank_tranfer'
    }
]
const [listOptCustomer, setListOptCustomer] = useState<optionsSelect[]>([])
 

    const { register, handleSubmit, setValue, formState:{ errors }} = useForm();

    const onSubmit =  (data:any) => {
        setLoading(true)
        console.log(JSON.stringify(data))
        if (paymentId) {
            // Update payment
            
            if (data.idCustomer === '') {
                toast.error('Customer Account must be provided',
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
            if (data.IdCustomer === 'Nothing') {
                // toast.error('Choose a customer',
                //     {position: toast.POSITION.TOP_CENTER})
                
                setLoading(false)
                return
            }
            console.log(data)
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

    // Load Invoice depending on customer
    const onChangeSelect = (e) => {
        console.log('Onchange launched ', e.target.value);
        findAllInvoiceByCustomer(paginationModel, e.target.value)
        .then(data => setInvoiceByCustomer(data))
    } 
 
    useEffect(() => {
        findAllCustomer()
        .then(data => 
            setListOptCustomer(CreationSelectionList({rows: data, value : 'id', label : 'customerName'}))
        )
        
        // Automatic feed fields of payment
        if (paymentId) {
            // select payment by id
            selectPayment(paymentId).then(payment => setPayment(payment))
            setValue("idCustomer", payment?.idCustomer)
            setValue("amount", payment?.amount)            
            setValue("paymentMode", payment?.paymentMode) 

            // // Load Invoice depending on customer
            findAllInvoiceByCustomer(paginationModel, payment?.idCustomer)
            .then(data => setInvoiceByCustomer(data))       
        }
            
    }, [paymentId])
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

  return (
    <PaymentForms 
      modal={modal} handleClose={handleClose} 
      handleSubmit={handleSubmit} errors={errors}
      onSubmit={onSubmit} register = {register}
      listOptCustomer={listOptCustomer} loading={loading} 
      payment={payment} columns={columns}
      checkboxSelection = {false} rows={fakeRows} onChangeSelect={onChangeSelect}
      setRowSelectionModel = {setRowSelectionModel} listOptpayMode={listOptpayMode}
    />
  );
}

