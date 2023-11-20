import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import LoadingButton from '@mui/lab/LoadingButton';
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from '@mui/icons-material/Cancel';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AlertDeleteInvoices = (props) => {
  return (
    <div>
     <ToastContainer/>
      <Dialog
        //maxHeight="100%"
        open={props.modal}
        onClose={props.handleClose}
      >      
            <DialogContent>
             Do you want to delete this record?
            </DialogContent>        
            <div className='flex justify-center '>         
              <DialogActions>
                <div className='mr-10'>
                  <LoadingButton
                  size="small"
                  color="error"
                  onClick={props.deleteInvoiceBut}
                  loading={props.loading}
                  loadingPosition="start"
                  startIcon={<DeleteIcon />}
                  variant="outlined"
                  type="submit"
                  >
                  <span>Delete</span>
                  </LoadingButton>
                </div>
                <Button 
                size="small" 
                color="primary"
                variant="outlined"
                startIcon={<CancelIcon />} 
                onClick={props.handleClose}
                >
                Cancel
                </Button>
              </DialogActions>
            </div>
      </Dialog>
    </div>
  );
}

export default AlertDeleteInvoices;

