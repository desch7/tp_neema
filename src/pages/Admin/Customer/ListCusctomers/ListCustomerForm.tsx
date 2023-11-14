import {DataGrid} from "@mui/x-data-grid";
import AddIcon from '@mui/icons-material/Add';
import React from 'react';
import Button from '@mui/material/Button';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Customer from '../AddCustomer/Customer.tsx';
import DeleteCustomer from '../DeleteCustomer/DeleteCustomer.tsx';


const ListCustomerForm = (props) => {
  return (
    <div className="p-4">
      <ToastContainer />
      {props.openModal && (
        <div>
          <Customer 
            onNotifmodal={props.onNotifmodal}  customer={props.customer}  
            msgSuccess={props.msgSuccess}  rows={props.rows}
          />
        </div>
      )}

      {props.openModalDelete && (
        <div>
          <DeleteCustomer 
            onNotifmodal={props.onNotifmodal} 
            idCustomer = {props.idCustomerToDel} 
            msgSuccess={props.msgSuccess}
          />
        </div>
      )}
    
      <h3 className="flex justify-center text-2x font-bold mb-10 mb-top">
        CUSTOMERS LIST
      </h3>
      <Button color="primary" variant= "outlined" 
        startIcon={<AddIcon />} onClick={props.displayModal}
      >
        Add Customer
      </Button>
      <span className='mr-3'></span>
      <div className="mt-2 " style={{ height: 370, width: '100%' }}>
        <DataGrid
          rows={props.rows}
          columns={props.columns}
          editMode="row"
          checkboxSelection
          onRowSelectionModelChange={(newRowSelectionModel) => {
            props.setRowSelectionModel(newRowSelectionModel);
          }}
          rowSelectionModel={props.rowSelectionModel}
          initialState={{
            pagination: {
              paginationModel: {  page: 0, pageSize: 5 }
            }
          }}
          pageSizeOptions={[5, 10, 20]}
        />
      </div>     
    </div>
  );
}


export default ListCustomerForm;