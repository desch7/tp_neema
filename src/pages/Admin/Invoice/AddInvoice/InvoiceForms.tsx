
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
import Select from '../../../../Components/Select.tsx';
import Checkbox from '../../../../Components/Checkbox.tsx';
import Textarea from '../../../../Components/Textarea.tsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const InvoiceForms = (props) => {
  return (
    <div>
     <ToastContainer />
      <Dialog
      fullScreen
        open={props.modal}
        onClose={props.handleClose}
      >
        <DialogTitle className='flex justify-center bg-slate-100'>
          New Invoice
        </DialogTitle>
        <form onSubmit={props.handleSubmit(props.onSubmit)} className='mt-0 w-screen'>       
            <DialogContent className=''>
              <div className='flex justify-around'>
                <div className='w-80 mr-3'>
                    <Input id='invoiceName' errors={props.errors} 
                      required={true} register={props.register} 
                      label='Invoice Name' type='text'
                      placeholder='Invoice Name' 
                    />
                    <Input id='accountNumber' errors={props.errors} 
                      placeholder='Account Number' type='text'
                      register={props.register}  label='Account Number' 
                    />
                    <Input id='terms' placeholder='Terms' 
                      errors={props.errors}  label='Terms'  
                      register={props.register} type='number'
                    />
                    <Input id='tmcClientNumber' required={true} 
                      placeholder='TCM Client Number'  type='text'
                      errors={props.errors}  register={props.register} 
                      label='TCM Client Number'
                    />
                    <Input id='slug' placeholder='Slug' 
                      errors={props.errors} register={props.register} 
                      required={true} label='Slug' 
                      type='number'
                    />
                </div>
                <div className='w-80 ml-3 mr-3'>
                    <Checkbox id='isSubAgency' errors={props.errors}  
                      label='Sub-Agency' register={props.register} 
                      type='checkbox'
                    />
                    <Input id='agency' placeholder='Agency' 
                      errors={props.errors} register={props.register} 
                      label='Agency' type='text'
                    />
                    <Input id='abKey' required={true} 
                      placeholder='Ab Key' errors={props.errors}
                      register={props.register} label='Ab Key' 
                      type='text'
                    />
                    <Input id='alias' required={true} 
                      placeholder='Alias' errors={props.errors} 
                      register={props.register} label='Alias'
                    />
                    <Textarea id='notes' errors={props.errors} 
                      placeholder='Notes' register={props.register} 
                      label='Notes'
                    />
                </div>
                <div className='w-80 ml-3'>
                    <Input id='street' placeholder='Street' 
                      errors={props.errors} register={props.register} 
                      label='Street' type='text'
                    />
                    <Input id='city' placeholder='City' 
                      errors={props.errors} register={props.register} 
                      label='City' type='text'
                    />
                    <Input id='state' placeholder='State'
                      errors={props.errors} register={props.register} 
                      label='State' type='text'
                    />
                    <Input id='zipCode' placeholder='Zip Code'
                      errors={props.errors}  register={props.register} 
                      label='Zip Code' type='text'
                    />
                    <Select id='language' label='Language' 
                      errors={props.errors} register={props.register} 
                      optionsList={props.listOptLang}
                    />
                </div>
              </div>
            </DialogContent>
            <div className='flex justify-center bg-slate-100'>         
              <DialogActions className=''>
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
                  <span>{props.invoice? 'Update' : 'Save'}</span>
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

export default InvoiceForms;

