import {
  GridRowSelectionModel, GridColDef, GridActionsCellItem,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { findAllCustomer } from "../../../../_service/customer_service.ts";
import CustomerModel from "../../../../models/CustomerModel.ts";
import DataTable from '../../../../Components/DataTable.tsx';
import AddIcon from '@mui/icons-material/Add';
import React from 'react';
import Button from '@mui/material/Button';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Customer from '../AddCustomer/Customer.tsx';
import DeleteCustomer from '../DeleteCustomer/DeleteCustomer.tsx';


const ListCustomer = () => {

  const fakeRows = [{
    id: 0,
    customerName: 'Customer',
    accountNumber: '123',
    state: 'cameroun',
    tmcClientNumber: '123',


  }]

  const columns: GridColDef[] = [
    {
      field: "customerName", headerName: "Customer Name",
      width: 250, align: 'left', headerAlign: 'left',
    },
    {
      field: "accountNumber", headerName: "Account Number",
      width: 250, align: 'left', headerAlign: 'left',
    },
    {
      field: "state", headerName: "State",
      width: 250, align: 'left', headerAlign: 'left',
    },
    {
      field: "tmcClientNumber", headerName: "TMC Client Number",
      width: 200, align: 'left', headerAlign: 'left',
    },
    {
      field: "actions", type: "actions", headerName: "Actions",
      width: 150, cellClassName: "actions", align: 'left',
      getActions: ({ id }) => {
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
    GridRowSelectionModel>([]);
  const [relaodData, setRelaodData] = useState(true)
  const [openModal, setOpenModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [idCustomerToDel, setIdCustomerToDel] = useState();
  const [customerId, setCustomerId] = useState<any>(null);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 25,
  });

  const displayModal = () => {
    setOpenModal(true);
  }

  const displayModalUpdate = (id: any) => () => {

    setCustomerId(id)
    setOpenModal(true);
  }

  const deleteCustomer = (id?: any) => () => {
    setIdCustomerToDel(id)
    setOpenModalDelete(true)
  };

  const onNotifmodal = (msg: boolean) => {
    setOpenModal(msg)
    setOpenModalDelete(msg)
    setCustomerId(null)
  }

  const msgSuccess = (msg: string) => {
    toast.success(
      msg, { position: toast.POSITION.TOP_CENTER }
    )
    setRelaodData(!relaodData)
  }

  useEffect(() => {
    findAllCustomer(paginationModel).then(data => {
      if (data?.length && data.length > 0) {
        setRows(data)
      }

    })
  }, [relaodData]);

  return (
    <div className="p-4">
      <ToastContainer />
      {openModal && (
        <div>
          <Customer
            onNotifmodal={onNotifmodal} customerId={customerId}
            msgSuccess={msgSuccess}
          />
        </div>
      )}

      {openModalDelete && (
        <div>
          <DeleteCustomer
            onNotifmodal={onNotifmodal}
            idCustomer={idCustomerToDel}
            msgSuccess={msgSuccess}
          />
        </div>
      )}

      <h3 className="flex justify-center text-2x font-bold mb-3">
        CUSTOMER LIST
      </h3>
      <div className="w-1/6">
        <Button color="primary" variant="outlined"
          startIcon={<AddIcon />} onClick={displayModal}
        >
          Add CUSTOMER
        </Button>
      </div>
      <div className="mt-2" style={{ height: 525, width: '100%' }}>
        <DataTable
          rows={rows}
          columns={columns}
          //rowCount={rowCount}
          //loading={loading}
          rowSelectionModel={rowSelectionModel}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          //rowCount={rowCountState}
          //loading={isLoading}
          checkboxSelection={false}
          rowHeight={30}
          setRowSelectionModel={setRowSelectionModel}
        />
      </div>
    </div>
  );
}


export default ListCustomer;