import {
    GridRowSelectionModel, GridColDef, GridActionsCellItem,
  } from "@mui/x-data-grid";
import React from 'react';
import {useEffect, useState} from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { findAllPayment } from "../../../../_service/payment_service.tsx";
import PaymentModel from "../../../../models/PaymentModel.tsx";
import DataTable from "./ListPaymentForm.tsx";


const ListPayment = () => {

    const columns: GridColDef[] = [
        { 
          field: "paymentName",  headerName: "Payment Name", 
          width: 200, align: 'left', headerAlign: 'left', 
        },
        { 
          field: "accountNumber",  headerName: "Account Number", 
          width: 150, align: 'left', headerAlign: 'left', 
        },
        {
          field: "state", headerName: "State",
          width: 170, align: 'left', headerAlign: 'left',
        },
        {
          field: "city", headerName: "City",
          width: 170, align: 'left', headerAlign: 'left',
        },
        {
          field: "zipCode", headerName: "Zip Code",
          width: 170, align: 'left', headerAlign: 'left',
        },
        {
          field: "agency", headerName: "Agency",
          width: 170, align: 'left', headerAlign: 'left',
        },
        {
          field: "tmcClientNumber", headerName: "TMC Client Number",
          width: 200, align: 'left', headerAlign: 'left',
        },
        {
          field: "actions", type: "actions", headerName: "Actions",
          width: 100, cellClassName: "actions",
          getActions: ({id}) => {
            return [
              <GridActionsCellItem
                icon={<EditIcon />} label="Edit" className="textPrimary"
                onClick={displayModalUpdate(id)} color="inherit"
              />,
              <GridActionsCellItem
                icon={<DeleteIcon />} label="Delete"
                onClick={deletePayment(id)} color="inherit"
              />
            ];
          }
        }
      ];
    
      const [rows, setRows] = useState<PaymentModel[]>([])
      const [rowSelectionModel, setRowSelectionModel] = useState<
          GridRowSelectionModel   >([]);
      const [relaodData, setRelaodData] = useState(true)
      const [openModal, setOpenModal] = useState(false);
      const [openModalDelete, setOpenModalDelete] = useState(false);
      const [idPaymentToDel, setIdPaymentToDel] = useState();
      const [payment, setPayment] = useState<any>(null);
    
      const displayModal = () => {
          setOpenModal(true);
      }
    
      const displayModalUpdate = (id: any) => () => {
        const cust = rows.filter((row) => row.id === parseInt(id))[0]
        setPayment(cust)
        setOpenModal(true);
      }
    
      const deletePayment = (id?: any) => () => {
        setIdPaymentToDel(id)
        setOpenModalDelete(true)
      };
    
      const onNotifmodal = (msg : boolean)=>{
        setOpenModal(msg)
        setOpenModalDelete(msg)
        setPayment(null)
      }
    
      const msgSuccess = (msg: string) => {
        toast.success(
          msg, {position: toast.POSITION.TOP_CENTER}
        )
        setRelaodData(!relaodData)
      }
    
      useEffect(() => {
        findAllPayment().then(data => setRows(data))
      }, [relaodData]);
    
      return (
        <DataTable 
          openModal={openModal} onNotifmodal={onNotifmodal} 
          payment={payment}  msgSuccess={msgSuccess} 
          rows={rows} idPaymentToDel = {idPaymentToDel}
          displayModal={displayModal} columns={columns} 
          rowSelectionModel={rowSelectionModel}
          openModalDelete={openModalDelete} 
          setRowSelectionModel={setRowSelectionModel}
        />
      );
}


export default ListPayment;