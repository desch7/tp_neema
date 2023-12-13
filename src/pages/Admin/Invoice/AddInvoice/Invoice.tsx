
import { useEffect, useState } from 'react';
import React from 'react';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createInvoice, findInvoiceById, updateInvoice } from '../../../../_service/invoice_service.ts';
import { controlFields } from '../../../../_Utils/InvoiceFieldsController.ts';
import InvoiceForms from './InvoiceForms.tsx';
import {
  GridRowSelectionModel, GridColDef, GridActionsCellItem, GridPaginationModel,
} from "@mui/x-data-grid";
import { findAllCustomer } from '../../../../_service/customer_service.ts';
import { CreationSelectionList } from '../../../../_Utils/CreationSelectionList.ts';
import InvoiceModel from '../../../../models/InvoiceModel.ts';
import TravelItems from '../../../../models/TravelItems.ts';
import "./Invoice.css";
import { findAllTravelItems } from '../../../../_service/travelItems_service.ts';
import { useDispatch } from 'react-redux';
//import { CREATEINVOICE, createInvoice } from '../../../../Actions/invoice.action.ts';



export default function Invoice({ onNotifmodal, invoiceId, rows, msgSuccess }) {

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
  const [travelItemsRows, setTravelItemsRows] = useState<TravelItems[]>([])
  const [custId, setCustId] = useState<number>()
  const dispatch = useDispatch()

  /*to handle pagiantion */
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 25,
  });

  const [rowCountState, setRowCountState] = useState(0);
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

      let travelItemsSelected = travelItemsRows.filter(travelItem => eltSelected.includes(travelItem.id))
      data.travelItems = travelItemsSelected;

      console.log('In insert =>', JSON.stringify(data))
      //dispatch({ type: CREATEINVOICE }, createInvoice(data))
      createInvoice(data)
        .then((response) => {
          if (response?.status === 'OK') {
            msgSuccess('Invoice was created successfully')
            setModal(false)
            onNotifmodal(false)
          } else {
            toast.error(response?.msg,
              { position: toast.POSITION.TOP_CENTER })
            setLoading(false)
          }
        })
    }

  };

  const onChangeSelect = (e) => {
    console.log('Onchange launched ', e.target.value);
    setCustId(e.target.value)
  }

  /*to handle pagiantion */

  /*to handle pagiantion */

  useEffect(() => {

    findAllCustomer()
      .then(data =>
        setListOptCustomer(CreationSelectionList({ rows: data, value: 'id', label: 'customerName' }))
      )

    /*to handle pagiantion */
    setLoading(true)
    findAllTravelItems()
      .then(resp => {
        if (resp?.data?.length > 0 && resp?.data?.length) {
          setTravelItemsRows(resp.data)
          setRowCountState((prevRowCountState) =>
            rowCountState !== undefined
              ? resp.totalRowCount
              : prevRowCountState,
          )
        }
        setLoading(false)
      })
    /*to handle pagiantion */

    if (invoiceId) {
      findInvoiceById(invoiceId).then(invoice => setInvoice(invoice))
      setValue("idCustomer", invoice?.idCustomer)
      setValue("dueDate", invoice?.dueDate)
    }

  }, []);


  return (
    <div>
      <InvoiceForms
        toggleAll={toggleAll}
        checkedAll={checkedAll}
        headers={headers}
        content={travelItemsRows}
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

