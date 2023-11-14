import {
    GridRowSelectionModel, GridColDef, GridActionsCellItem,
  } from "@mui/x-data-grid";
import React from 'react';
import {useEffect, useState} from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { findAllCustomer } from "../../../../_service/customer_service.tsx";
import CustomerModel from "../../../../models/CustomerModel.ts";
import DataTable from "./ListCustomerForm.tsx";


const ListCustomer = () => {

    const columns: GridColDef[] = [
        { 
          field: "customerName",  headerName: "Customer Name", 
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
                onClick={deleteCustomer(id)} color="inherit"
              />
            ];
          }
        }
      ];
    
      const [rows, setRows] = useState<CustomerModel[]>([])
      const [rowSelectionModel, setRowSelectionModel] = useState<
          GridRowSelectionModel   >([]);
      const [relaodData, setRelaodData] = useState(true)
      const [openModal, setOpenModal] = useState(false);
      const [openModalDelete, setOpenModalDelete] = useState(false);
      const [idCustomerToDel, setIdCustomerToDel] = useState();
      const [customer, setCustomer] = useState<any>(null);
    
      const displayModal = () => {
          setOpenModal(true);
      }
    
      const displayModalUpdate = (id: any) => () => {
        const cust = rows.filter((row) => row.id === parseInt(id))[0]
        setCustomer(cust)
        setOpenModal(true);
      }
    
      const deleteCustomer = (id?: any) => () => {
        setIdCustomerToDel(id)
        setOpenModalDelete(true)
      };
    
      const onNotifmodal = (msg : boolean)=>{
        setOpenModal(msg)
        setOpenModalDelete(msg)
        setCustomer(null)
      }
    
      const msgSuccess = (msg: string) => {
        toast.success(
          msg, {position: toast.POSITION.TOP_CENTER}
        )
        setRelaodData(!relaodData)
      }
    
      useEffect(() => {
        findAllCustomer().then(data => setRows(data))
      }, [relaodData]);
    
      return (
        <DataTable 
          openModal={openModal} onNotifmodal={onNotifmodal} 
          customer={customer}  msgSuccess={msgSuccess} 
          rows={rows} idCustomerToDel = {idCustomerToDel}
          displayModal={displayModal} columns={columns} 
          rowSelectionModel={rowSelectionModel}
          openModalDelete={openModalDelete} 
          setRowSelectionModel={setRowSelectionModel}
        />
      );
}


export default ListCustomer;