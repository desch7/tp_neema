
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import React from 'react';
import Input from '../../../../Components/Input.tsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CustomerForms = (props) => {
  return (
    <div>
      <ToastContainer />
      <Dialog
        maxWidth="xl"
        open={props.modal}
        onClose={props.handleClose}
      >
        <DialogTitle className='flex justify-center h-10 bg-slate-100'>
          <span className='text-base font-black'>{props.customerId ? 'Edit Customer' : 'New Customer'} </span>
        </DialogTitle>
        <form onSubmit={props.handleSubmit(props.onSubmit)} className='mt-0 w-full'>
          <DialogContent>
            <div className='flex justify-around'>
              <div className='w-80 mr-3'>
                <Input id='customerName' errors={props.errors}
                  required={true} register={props.register}
                  label='Customer Name' type='text'
                  placeholder='Customer Name'
                />
                <Input id='accountNumber' errors={props.errors}
                  placeholder='Account Number' type='text'
                  register={props.register} label='Account Number' required={true}
                />
              </div>
              <div className='w-80 ml-3 mr-3'>
                <Input id='tmcClientNumber' required={true}
                  placeholder='TCM Client Number' type='text'
                  errors={props.errors} register={props.register}
                  label='TCM Client Number'
                />
                <Input id='alias' required={true}
                  placeholder='Alias' errors={props.errors}
                  register={props.register} label='Alias'
                />
              </div>
              <div className='w-80 ml-3'>
                <Input id='state' placeholder='State'
                  errors={props.errors} register={props.register}
                  label='State' type='text' required={true}
                />
              </div>
            </div>
          </DialogContent>
          <div className='flex justify-center'>
            <DialogActions>
              <div className='mr-10'>
                <LoadingButton
                  size="small"
                  color="success"
                  loading={props.loading}
                  loadingPosition="start"
                  startIcon={<SaveIcon />}
                  variant="outlined"
                  type="submit"
                >
                  <span>{props.customerId ? 'Update' : 'Save'}</span>
                </LoadingButton>
              </div>
              <Button
                size="small"
                color="error"
                variant="outlined"
                startIcon={<CancelIcon />}
                onClick={props.handleClose}
              >
                Cancel
              </Button>
            </DialogActions>
          </div>
        </form>
      </Dialog>
    </div>
  );
}

export default CustomerForms;

