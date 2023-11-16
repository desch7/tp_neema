import {
    GridRowSelectionModel, GridColDef, GridActionsCellItem,
  } from "@mui/x-data-grid";
import React from 'react';
import {useEffect, useState} from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { findAllInvoice } from "../../../../_service/invoice_service.ts";
import InvoiceModel from "../../../../models/InvoiceModel.tsx";
import PaymentIcon from '@mui/icons-material/Payment';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Invoice from '../AddInvoice/Invoice.tsx';
import DeleteInvoice from '../DeleteInvoice/DeleteInvoice.tsx';
import DataTable from '../../../../Components/DataTable.tsx';


const ListInvoice = () => {

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
        {
          field: "actions", type: "actions", headerName: "Actions",
          width: 150, cellClassName: "actions", align: 'center', 
          getActions: ({id}) => {
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
                icon={<PaymentIcon />}
                label="Imputation"
                //onClick={deleteCustomer(id)}
                color="inherit"
              />
              </div>
              <div className="w-12">
              <GridActionsCellItem
                icon={<DeleteIcon />} label="Delete"
                onClick={deleteInvoice(id)} color="inherit"
              />
              </div>
              </div>       
            ];
          }
        }
      ];
      const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 25,
      });
      // request for pagination from backend
      //const { isLoading, rows, totalRowCount } = useQuery(paginationModel);

      // const [rowCountState, setRowCountState] = useState(
      //   totalRowCount || 0,
      // );
      const [rows, setRows] = useState<InvoiceModel[]>([])
      const [rowSelectionModel, setRowSelectionModel] = useState<
          GridRowSelectionModel   >([]);
      const [relaodData, setRelaodData] = useState(true)
      const [openModal, setOpenModal] = useState(false);
      const [openModalDelete, setOpenModalDelete] = useState(false);
      const [idInvoiceToDel, setIdInvoiceToDel] = useState();
      const [invoice, setInvoice] = useState<any>(null);
    
      const displayModal = () => {
          setOpenModal(true);
      }
    
      const displayModalUpdate = (id: any) => () => {
        const cust = rows.filter((row) => row.id === parseInt(id))[0]
        setInvoice(cust)
        setOpenModal(true);
      }
    
      const deleteInvoice = (id?: any) => () => {
        setIdInvoiceToDel(id)
        setOpenModalDelete(true)
      };
    
      const onNotifmodal = (msg : boolean)=>{
        setOpenModal(msg)
        setOpenModalDelete(msg)
        setInvoice(null)
      }
    
      const msgSuccess = (msg: string) => {
        toast.success(
          msg, {position: toast.POSITION.TOP_CENTER}
        )
        setRelaodData(!relaodData)
      }
    
      useEffect(() => {
        findAllInvoice(paginationModel).then(data => setRows(data))
      }, [relaodData]);

      // useEffect(() => {
      //   setRowCountState((prevRowCountState) =>
      //     totalRowCount !== undefined
      //       ? totalRowCount
      //       : prevRowCountState,
      //   );
      // }, [totalRowCount, setRowCountState]);

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
        <div className="p-4">
      <ToastContainer />
      {openModal && (
        <div>
          <Invoice 
            onNotifmodal={onNotifmodal}  invoice={invoice}  
            msgSuccess={msgSuccess}  rows={rows}
          />
        </div>
      )}

      {openModalDelete && (
        <div>
          <DeleteInvoice 
            onNotifmodal={onNotifmodal} 
            idInvoice = {idInvoiceToDel} 
            msgSuccess={msgSuccess}
          />
        </div>
      )}
    
      <h3 className="flex justify-center text-2x font-bold mb-3">
        INVOICES LIST
      </h3>
      <div className="w-1/6">
        <Button color="primary" variant= "outlined" 
          startIcon={<AddIcon />} onClick={displayModal}
        >
          Add Invoice
        </Button>
      </div>
      
      <div className="mt-2" style={{ height: 525, width: '100%' }}>
        <DataTable
          rows={fakeRows}
          columns={columns}
          //rowCount={rowCount}
          //loading={loading}
          rowSelectionModel={rowSelectionModel}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          //rowCount={rowCountState}
          //loading={isLoading}
          checkboxSelection = {false}
          rowHeight={30}
          setRowSelectionModel = {setRowSelectionModel}
        />
      </div>     
    </div>
      );
}


export default ListInvoice;