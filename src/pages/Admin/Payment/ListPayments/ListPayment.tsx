import {
  GridRowSelectionModel, GridColDef, GridActionsCellItem, GridPaginationModel,
} from "@mui/x-data-grid";
import React from 'react';
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { findAllPayment } from "../../../../_service/payment_service.ts";
import PaymentModel from "../../../../models/PaymentModel.ts";
import DataTable from '../../../../Components/DataTable.tsx';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Payment from '../AddPayment/Payment.tsx';
import DeletePayment from "../DeletePayment/DeletePayment.tsx";


const ListPayment = () => {

  const columns: GridColDef[] = [
    {
      field: "paymentNumber", headerName: "Payment Number",
      width: 200, align: 'left', headerAlign: 'left',
    },
    {
      field: "paymentDate", headerName: "Payment Date",
      width: 150, align: 'left', headerAlign: 'left',
    },
    {
      field: "paymentMode", headerName: "Payment Mode",
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
      field: "usedAmount", headerName: "Used Amount",
      width: 150, align: 'left', headerAlign: 'left',
    },
    {
      field: "actions", type: "actions", headerName: "Actions",
      width: 150, cellClassName: "actions", align: 'center',
      getActions: ({ id }) => {
        return [
          <div className="flex ">
            <div className="w-12">
              <GridActionsCellItem
                icon={<EditIcon />} label="Edit" className="textPrimary"
                onClick={displayModalUpdate(id)} color="inherit"
              />
            </div>
            <div className="w-12">
              <GridActionsCellItem
                icon={<DeleteIcon />} label="Delete"
                onClick={deletePayment(id)} color="inherit"
              />
            </div>
          </div>
        ];
      }
    }
  ];
  const [loading, setLoading] = useState(false)

  /*to handle pagiantion */
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 25,
  });

  const [rowCountState, setRowCountState] = useState(0);
  /*to handle pagiantion */
  const [rows, setRows] = useState<PaymentModel[]>([])
  const [rowSelectionModel, setRowSelectionModel] = useState<
    GridRowSelectionModel>([]);
  const [relaodData, setRelaodData] = useState(true)
  const [openModal, setOpenModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [idPaymentToDel, setIdPaymentToDel] = useState();
  const [paymentId, setPaymentId] = useState<any>(null);

  const displayModal = () => {

    setOpenModal(true);
  }

  const displayModalUpdate = (id: any) => () => {
    //const cust = rows.filter((row) => row.id === parseInt(id))[0]
    setPaymentId(id)
    setOpenModal(true);
  }

  const deletePayment = (id?: any) => () => {
    setIdPaymentToDel(id)
    setOpenModalDelete(true)
  };

  const onNotifmodal = (msg: boolean) => {
    setOpenModal(msg)
    setOpenModalDelete(msg)
    setPaymentId(null)
  }

  const msgSuccess = (msg: string) => {
    toast.success(
      msg, { position: toast.POSITION.TOP_CENTER }
    )
    setRelaodData(!relaodData)
  }

  /*to handle pagiantion */
  const handlePaginationChange = (newPaginationModel: GridPaginationModel) => {
    console.log('Pagination changed before:', paginationModel)
    setPaginationModel(newPaginationModel);
    console.log('Pagination changed after:', paginationModel)
    console.log('Pagination changed variable direct:', newPaginationModel)
    setLoading(true)

    findAllPayment(newPaginationModel)
      .then(resp => {
        if (resp?.data?.length > 0 && resp?.data?.length) {
          setRows(resp.data)
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

    /*to handle pagiantion */
    setLoading(true)
    findAllPayment(paginationModel)
      .then(resp => {
        if (resp?.data?.length > 0 && resp?.data?.length) {
          setRows(resp.data)
          setRowCountState((prevRowCountState) =>
            rowCountState !== undefined
              ? resp.totalRowCount
              : prevRowCountState,
          )
        }
        setLoading(false)
      })
    /*to handle pagiantion */
  }, [relaodData]);

  // const fakeRows = [
  //   {
  //     id: 1,
  //     paymentNumber: "PER-001", //string (generated from backend)
  //     idCustomer: 0, //integer
  //     paymentDate: "2022-09-09", // date in this format
  //     paymentMode: "cash", //date in this format,
  //     amount: 10000.00, //float. ---> SUM of total price of all travel_item linked to invoice
  //     balance: 0.00, //string
  //     usedAmount: 0.00, //float
  //     status: "open", //float
  //   }
  // ]

  return (
    <div className="p-4 h-full">
      <ToastContainer />
      {openModal && (
        <div>
          <Payment
            onNotifmodal={onNotifmodal} paymentId={paymentId}
            msgSuccess={msgSuccess}
          />
        </div>
      )}

      {openModalDelete && (
        <div>
          <DeletePayment
            onNotifmodal={onNotifmodal}
            idPayment={idPaymentToDel}
            msgSuccess={msgSuccess}
          />
        </div>
      )}

      <h3 className="flex justify-center text-2x font-bold mb-3">
        PAYMENTS LIST
      </h3>
      <div className="w-1/6">
        <Button color="primary" variant="outlined"
          startIcon={<AddIcon />} onClick={displayModal}
        >
          Add Payment
        </Button>
      </div>
      <div className="mt-2" style={{ height: 525, width: '100%' }}>
        <DataTable
          rows={rows}
          columns={columns}
          rowCount={rowCountState}
          loading={loading}
          rowSelectionModel={rowSelectionModel}
          onPaginationModelChange={handlePaginationChange}
          paginationModel={paginationModel}
          checkboxSelection={false}
          rowHeight={30}
          setRowSelectionModel={setRowSelectionModel}
        />
      </div>
    </div>
  );
}


export default ListPayment;