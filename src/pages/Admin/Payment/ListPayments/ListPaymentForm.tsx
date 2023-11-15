import {DataGrid} from "@mui/x-data-grid";
import AddIcon from '@mui/icons-material/Add';
import React from 'react';
import Button from '@mui/material/Button';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Payment from '../AddPayment/Payment.tsx';
import DeletePayment from "../DeletePayment/DeletePayment.tsx";


const ListPaymentForm = (props) => {
  return (
    <div className="p-4">
      <ToastContainer />
      {props.openModal && (
        <div>
          <Payment 
            onNotifmodal={props.onNotifmodal}  payment={props.payment}  
            msgSuccess={props.msgSuccess}  rows={props.rows}
          />
        </div>
      )}

      {props.openModalDelete && (
        <div>
          <DeletePayment 
            onNotifmodal={props.onNotifmodal} 
            idPayment = {props.idPaymentToDel} 
            msgSuccess={props.msgSuccess}
          />
        </div>
      )}
    
      <h3 className="flex justify-center text-2x font-bold mb-10 mb-top">
        PAYMENTS LIST
      </h3>
      <div className="w-1/6">
        <Button color="primary" variant= "outlined" 
          startIcon={<AddIcon />} onClick={props.displayModal}
        >
          Add Payment
        </Button>
      </div>
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


export default ListPaymentForm;