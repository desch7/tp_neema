
import { useEffect, useState } from 'react';
import React from 'react';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { findInvoiceById, updateInvoice } from '../../../../_service/invoice_service.ts';
import { controlFields } from '../../../../_Utils/InvoiceFieldsController.ts';
import InvoiceForms from './InvoiceForms.tsx';
import { CreationSelectionList } from '../../../../_Utils/CreationSelectionList.ts';
import InvoiceModel from '../../../../models/InvoiceModel.ts';
import "./Invoice.css";
import { createInvoice } from '../../../../Actions/invoice.action.ts';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks.ts';
import { InvoicesError } from '../../../../Slice/invoiceSlice.js';
import { selectAllTravelItems, travelItemsStatus } from '../../../../Slice/travelItemsSlice.js';
import { findAllTravelItems } from '../../../../Actions/travelItems.actions.ts';
import { CustomersStatus, selectAllCustomers } from '../../../../Slice/customerSlice.js';
import { findAllCustomers } from '../../../../Actions/customer.action.ts';
import { unwrapResult } from '@reduxjs/toolkit';



export default function Invoice({ onNotifmodal, invoiceId, rows, msgSuccess }) {
  const dispatch = useAppDispatch();
  const invError = useAppSelector(InvoicesError)
  const allTravelItems = useAppSelector(selectAllTravelItems)
  const trvlItemsStatus = useAppSelector(travelItemsStatus)
  const allCustomers = useAppSelector(selectAllCustomers)
  const customerStatus = useAppSelector(CustomersStatus)

  interface optionsSelect {
    label: string,
    value: number,
  }
  const headers = [
    { value: 'ticketNumber', label: 'Ticket Number' },
    { value: 'travelerName', label: 'Travel Name' },
    { value: 'itinerary', label: 'Itinerary' },
    { value: 'totalPrice', label: 'Total Price' },
  ]
  // const fakeRows = [
  //   {
  //     id: 1,
  //     ticketNumber: 'qwrewrewr',
  //     travelerName: 'ncowmks',
  //     itinerary: 'nxjwkeuwnodj',
  //     totalPrice: 1622822
  //   },
  //   {
  //     id: 2,
  //     ticketNumber: 'qwrewrewr',
  //     travelerName: 'ncowmks',
  //     itinerary: 'nxjwkeuwnodj',
  //     totalPrice: 1622822
  //   },
  //   {
  //     id: 3,
  //     ticketNumber: 'qwrewrewr',
  //     travelerName: 'ncowmks',
  //     itinerary: 'nxjwkeuwnodj',
  //     totalPrice: 1622822
  //   }
  // ]
  const [eltSelected, setEltSelected] = useState<number[]>([])
  const [checkedAll, setCheckedAll] = useState<boolean>(false)

  const singleOnChange = (eltId) => {
    let tab = eltSelected
    //console.log((tab.filter(el => el === eltId)).length);

    if ((tab.filter(el => el === eltId)).length > 0) {
      tab = tab.filter(el => el !== eltId)
    } else {
      tab = [...tab, eltId]
    }
    let checkA = tab.length > 0 ? true : false
    setCheckedAll(checkA)
    setEltSelected(tab)
    //console.log(tab);

  }

  const toggleAll = () => {
    let tab: number[] = []
    if (!checkedAll) {
      tab = rows.map(el => el.id)
    } else {
      tab = []
    }
    //console.log('tab toggleAll', tab);
    setCheckedAll(!checkedAll)
    setEltSelected(tab)
    // setSingleCheck(!checkedAll)
  }

  const [modal, setModal] = useState(true)
  const [loading, setLoading] = useState(false)
  const [listOptCustomer, setListOptCustomer] = useState<optionsSelect[]>([])
  const [invoice, setInvoice] = useState<InvoiceModel>()
  const [custId, setCustId] = useState<number>()

  /*to handle pagiantion */
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 25,
  });

  /*to handle pagiantion */

  const handleClose = () => {
    setModal(false)
    onNotifmodal(false)
  }

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    data.idCustomer = custId
    data.idCustomer = parseInt(data.idCustomer)
    setLoading(true)
    let crtlFields = controlFields(data, eltSelected)
    if (invoiceId) {
      // Update invoice
      if (crtlFields !== 'OK') {
        toast.error(crtlFields,
          { position: toast.POSITION.TOP_CENTER })

        setLoading(false)
        return
      }
      console.log(JSON.stringify(data))
      updateInvoice(data)
        .then((response) => {
          if (response === 'OK') {
            msgSuccess('Invoice was updated successfully')
            setModal(false)
            onNotifmodal(false)
          } else {
            toast.error('The server is not available or something went wrong!',
              { position: toast.POSITION.TOP_CENTER })
            setLoading(false)
          }
        })

    } else {
      //insert invoice
      data.idCustomer = custId
      data.idCustomer = parseInt(data.idCustomer)
      if (crtlFields !== 'OK') {
        toast.error(crtlFields,
          { position: toast.POSITION.TOP_CENTER })

        setLoading(false)
        return
      }

      let travelItemsSelected = allTravelItems.data.filter(travelItem => eltSelected.includes(travelItem.id))
      data.travelItems = travelItemsSelected;

      console.log('In insert =>', JSON.stringify(data))
      dispatch(createInvoice(data))
        .then(unwrapResult)
        .then(res => {
          if (res.status === 'KO') {
            toast.error(res.msg,
              { position: toast.POSITION.TOP_CENTER })

            setLoading(false)
            return
          } else {
            msgSuccess('Invoice was created successfully')
            setModal(false)
            onNotifmodal(false)
          }

        })
    }

  };

  const onChangeSelect = (e) => {
    console.log('Onchange launched ', e.target.value);
    setCustId(e.target.value)
  }


  useEffect(() => {

    console.log('All customers for create select list ', allCustomers);
    if (customerStatus === 'init') {
      dispatch(findAllCustomers())
    }
    if (customerStatus === 'succeeded') {
      //set select list for customer
      setListOptCustomer(CreationSelectionList({ rows: allCustomers?.data, value: 'id', label: 'customerName' }))
    }

    if (invoiceId) {
      findInvoiceById(invoiceId).then(invoice => setInvoice(invoice))
      setValue("idCustomer", invoice?.idCustomer)
      setValue("dueDate", invoice?.dueDate)
    }

    if (trvlItemsStatus === 'init') {
      dispatch(findAllTravelItems());
    }
    if (trvlItemsStatus === 'loading') {
      setLoading(true);
    } else if (trvlItemsStatus === 'succeeded') {
      setLoading(false);
    } else if (trvlItemsStatus === 'failed') {
      setLoading(true);
    }
    console.log('allTravelItems =>>', allTravelItems);

  }, [dispatch, allCustomers]);


  return (
    <div>
      <InvoiceForms
        toggleAll={toggleAll}
        checkedAll={checkedAll}
        headers={headers}
        content={allTravelItems?.data}
        singleOnChange={singleOnChange}
        loading={loading}
        modal={modal} handleClose={handleClose} invoiceId={invoiceId}
        handleSubmit={handleSubmit} errors={errors}
        onSubmit={onSubmit} register={register}
        listOptCustomer={listOptCustomer}  /*fakeRows*/
        invoice={invoice} onChangeSelect={onChangeSelect}
      />
    </div>

  );
}

