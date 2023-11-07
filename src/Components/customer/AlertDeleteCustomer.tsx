import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import LoadingButton from '@mui/lab/LoadingButton';
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from '@mui/icons-material/Cancel';
import { useState } from 'react';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteCustomer } from '../../services/customer/Api.ts';


export default function AlertDeleteCustomer({ onNotifmodal, idCustomer, msgSuccess}) {

    const [modal, setModal] = useState(true)
    const [loading, setLoading] = useState(false)

    const handleClose = () => { 
        setModal(false)
        onNotifmodal(false)
      }

    const deleteCustomerBut = () =>{
        setLoading(true)
        deleteCustomer(idCustomer).then(res => {
          if (res === 'OK') {
            msgSuccess('Customer was deleted successfully')
            setModal(false)
            onNotifmodal(false)
          }else{
            setLoading(false)
            toast.error('The server is not available or something went wrong!',
                {position: toast.POSITION.TOP_CENTER})
                return
          }
        })
        
    }
    
  return (
    <div>
     <ToastContainer/>
      <Dialog
        maxHeight="100%"
        open={modal}
        onClose={handleClose}
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
                  onClick={deleteCustomerBut}
                  loading={loading}
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
                variant="outlined"//"contained"
                startIcon={<CancelIcon />} 
                onClick={handleClose}
                >
                Cancel
                </Button>
              </DialogActions>
            </div>
      </Dialog>
    </div>
  );
}

