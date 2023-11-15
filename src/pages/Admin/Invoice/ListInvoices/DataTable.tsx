import {DataGrid} from "@mui/x-data-grid";
import AddIcon from '@mui/icons-material/Add';
import React from 'react';
import Button from '@mui/material/Button';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Invoice from '../AddInvoice/Invoice.tsx';
import DeleteInvoice from '../DeleteInvoice/DeleteInvoice.tsx';


const DataTable = (props) => {
  return (
    <div className="p-4">
      <ToastContainer />
      {props.openModal && (
        <div>
          <Invoice 
            onNotifmodal={props.onNotifmodal}  invoice={props.invoice}  
            msgSuccess={props.msgSuccess}  rows={props.rows}
          />
        </div>
      )}

      {props.openModalDelete && (
        <div>
          <DeleteInvoice 
            onNotifmodal={props.onNotifmodal} 
            idInvoice = {props.idInvoiceToDel} 
            msgSuccess={props.msgSuccess}
          />
        </div>
      )}
    
      <h3 className="flex justify-center text-2x font-bold mb-3">
        INVOICES LIST
      </h3>
      <div className="w-1/6">
        <Button color="primary" variant= "outlined" 
          startIcon={<AddIcon />} onClick={props.displayModal}
        >
          Add Invoice
        </Button>
      </div>
      
      <div className="mt-2" style={{ height: 525, width: '100%' }}>
        <DataGrid
          rows={props.rows}
          columns={props.columns}
          rowCount={props.rowCount}
          loading={props.loading}
          onRowSelectionModelChange={(newRowSelectionModel) => {
            console.log(newRowSelectionModel);
            
            props.setRowSelectionModel(newRowSelectionModel);
          }}
          rowSelectionModel={props.rowSelectionModel}
          pageSizeOptions={[20]}
          paginationModel={props.paginationModel}
          paginationMode="server"
          onPaginationModelChange={props.setPaginationModel}
        />
      </div>     
    </div>
  );
}


export default DataTable;