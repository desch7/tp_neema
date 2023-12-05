
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



export default function Invoice({ onNotifmodal, invoiceId, rows, msgSuccess }) {

  interface optionsSelect {
    label: string,
    value: number,
  }

  const columns: GridColDef[] = [
    {
      field: "ticketNumber", headerName: "Ticket Number",
      width: 150, align: 'left', headerAlign: 'left',
    },
    {
      field: "travelerName", headerName: "Travel Name",
      width: 350, align: 'left', headerAlign: 'left',
    },
    {
      field: "itinerary", headerName: "Itinerary",
      width: 250, align: 'left', headerAlign: 'left',
    },
    {
      field: "totalPrice", headerName: "Total Price",
      width: 250, align: 'left', headerAlign: 'left',
    },

  ];

  // const fakeRows = [
  //   {
  //     id: 0,
  //     ticketNumber: "TCK-001",
  //     travelerName: "Travel 1",
  //     itinerary: "BE-CA",
  //     totalPrice: 10000.00,
  //   }
  // ]
  const [rowSelectionModel, setRowSelectionModel] = useState<
    GridRowSelectionModel
  >([]);
  const [modal, setModal] = useState(true)
  const [loading, setLoading] = useState(false)
  const [listOptCustomer, setListOptCustomer] = useState<optionsSelect[]>([])
  const [invoice, setInvoice] = useState<InvoiceModel>()
  const [travelItemsRows, setTravelItemsRows] = useState<TravelItems[]>([])
  const [custId, setCustId] = useState<number>()

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
    setLoading(true)
    let crtlFields = controlFields(data, rowSelectionModel)
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

      if (crtlFields !== 'OK') {
        toast.error(crtlFields,
          { position: toast.POSITION.TOP_CENTER })

        setLoading(false)
        return
      }
      console.log('rowSelectionModel ', rowSelectionModel);

      let travelItemsSelected = travelItemsRows.filter(travelItem => rowSelectionModel.includes(travelItem.id))
      data.travelItems = travelItemsSelected;

      console.log('In insert =>', JSON.stringify(data))

      createInvoice(data)
        .then((response) => {
          if (response === 'OK') {
            msgSuccess('Invoice was created successfully')
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

  const onChangeSelect = (e) => {
    console.log('Onchange launched ', e.target.value);
    setCustId(e.target.value)
  }

  /*to handle pagiantion */
  const handlePaginationChange = (newPaginationModel: GridPaginationModel) => {
    console.log('Pagination changed before:', paginationModel)
    setPaginationModel(newPaginationModel);
    console.log('Pagination changed after:', paginationModel)
    console.log('Pagination changed variable direct:', newPaginationModel)
    setLoading(true)

    findAllTravelItems(newPaginationModel)
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

  }
  /*to handle pagiantion */

  useEffect(() => {

    findAllCustomer()
      .then(data =>
        setListOptCustomer(CreationSelectionList({ rows: data, value: 'id', label: 'customerName' }))
      )

    /*to handle pagiantion */
    setLoading(true)
    findAllTravelItems(paginationModel)
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
        modal={modal} handleClose={handleClose} invoiceId={invoiceId}
        handleSubmit={handleSubmit} errors={errors}
        onSubmit={onSubmit} register={register}
        loading={loading} rowCount={rowCountState}
        listOptCustomer={listOptCustomer} rows={travelItemsRows}
        invoice={invoice} columns={columns} checkboxSelection={true}
        setRowSelectionModel={setRowSelectionModel} onChangeSelect={onChangeSelect}
        onPaginationModelChange={handlePaginationChange} paginationModel={paginationModel}
      />
    </div>

  );
}

