<<<<<<< HEAD
import {useEffect, useState} from "react";
import React from "react";
import {
  DataGrid,
  GridRowSelectionModel,
  GridColDef,
  GridActionsCellItem,
  
} from "@mui/x-data-grid";

import AddIcon from '@mui/icons-material/Add';

import Button from '@mui/material/Button';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import CustomerForm from "./Components/CustomerForm.tsx";
import AlertDeleteCustomer from "./Components/AlertDeleteCustomer.tsx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {

  
  const columns: GridColDef[] = [
    { field: "customerName", 
      headerName: "Customer Name", 
      width: 200,
      align: 'left',
      headerAlign: 'left', 
    },
    { field: "accountNumber", 
      headerName: "Account Number", 
      width: 150,
      align: 'left',
      headerAlign: 'left', 
    },
    {
      field: "state",
      headerName: "State",
      width: 170,
      align: 'left',
      headerAlign: 'left',
    },
    {
      field: "city",
      headerName: "City",
      width: 170,
      align: 'left',
      headerAlign: 'left',
    },
    {
      field: "zipCode",
      headerName: "Zip Code",
      width: 170,
      align: 'left',
      headerAlign: 'left',
    },
    {
      field: "agency",
      headerName: "Agency",
      width: 170,
      align: 'left',
      headerAlign: 'left',
    },
    {
      field: "tmcClientNumber",
      headerName: "TMC Client Number",
      width: 200,
      align: 'left',
      headerAlign: 'left',
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({id}) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={displayModalUpdate(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={deleteCustomer(id)}
            color="inherit"
          />
        ];
      }
    }
  ];



  const [rows, setRows] = useState<any>([])

  const [rowSelectionModel, setRowSelectionModel] = useState<
    GridRowSelectionModel
  >([]);
  const [relaodData, setRelaodData] = useState(true)
  const [openModal, setOpenModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  // const [displayDeleteAll, setDisplayDeleteAll] = useState(false);
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
    toast.success(msg,
                    {position: toast.POSITION.TOP_CENTER})
    setRelaodData(!relaodData)
  }

  useEffect(() => {
    //console.log(rowSelectionModel)
    // if (rowSelectionModel.length > 0) {
    //   setDisplayDeleteAll(true)
    // }else{
    //   setDisplayDeleteAll(false)
    // }
    console.log('REACT_APP_BASE_ENDPOINT', `${process.env.REACT_APP_BASE_ENDPOINT}/customers`);
    
   fetch(`${process.env.REACT_APP_BASE_ENDPOINT}/customers`)
                      .then(res => res.json())
                      .then(data =>{
                        //console.log('ok => ',data)
                        setRows(data)
                      })
                      .catch(err => console.log('error fetch data=> ',err))
                      //setLoading(false)
    
    
  }, [relaodData]);


  return (
    <div className="p-4">
        <ToastContainer />
              {openModal && (
            <div>
              <CustomerForm onNotifmodal={onNotifmodal} customer={customer} msgSuccess={msgSuccess} rows={rows}/>
            </div>
          )}

            {openModalDelete && (
              <div>
                <AlertDeleteCustomer onNotifmodal={onNotifmodal} idCustomer = {idCustomerToDel} msgSuccess={msgSuccess}/>
              </div>
            )}

          <h3 className="flex justify-center text-2x font-bold mb-10 mt-20">CUSTOMERS LIST</h3>
          <Button color="primary" variant= "outlined" startIcon={<AddIcon />} onClick={displayModal}>
            Add Customer
          </Button> <span className='mr-3'></span>
          {/* {displayDeleteAll && (
            <>
              <Button color="primary" variant= "outlined" startIcon={<DeleteIcon />} onClick={displayModal}>
                Add Customer
              </Button>
            </>
            )} */}
          <div className="mt-2 " style={{ height: 370, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              editMode="row"
              checkboxSelection
              onRowSelectionModelChange={(newRowSelectionModel) => {
                setRowSelectionModel(newRowSelectionModel);
              }}
              rowSelectionModel={rowSelectionModel}
              initialState={{
                pagination: {
                  paginationModel: {  page: 0, pageSize: 5 }
                }
              }}
              pageSizeOptions={[5, 10, 20]}
            />
          </div>     
=======
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminRouter from './pages/Admin/AdminRouter.tsx';
import AuthRouter from './pages/auth/authRouter.tsx';
import AuthGuard from './_helpers/AuthGuard.tsx';
import React from 'react';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<AuthRouter/>}/>
          <Route path='/admin/*' element={
              <AuthGuard>
                <AdminRouter/>
              </AuthGuard>
            }/>
          <Route path='/auth/*' element={<AuthRouter/>}/>
        </Routes>
      </BrowserRouter>
>>>>>>> dev-desch
    </div>
  );
}

<<<<<<< HEAD
=======
export default App;
>>>>>>> dev-desch
