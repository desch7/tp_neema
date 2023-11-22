
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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DataTable from '../../../../Components/DataTable.tsx';


const PaymentForms = (props) => {
  return (
    <div>
      <ToastContainer />
      <Dialog
        fullScreen
        open={props.modal}
        onClose={props.handleClose}
      >
        <DialogTitle className='flex justify-center bg-slate-100'>
          {props.payment ? 'Edit Payment' : 'New Payment'}
        </DialogTitle>
        <form onSubmit={props.handleSubmit(props.onSubmit)} className='mt-0 w-screen'>
          <DialogContent>
            <div className='flex justify-around'>
              <div className='w-80 mr-3'>
                <Select id='idCustomer' errors={props.errors}
                  required={true} register={props.register} onChangeSelect={props.onChangeSelect}
                  label='Customer Account' optionsList={props.listOptCustomer}
                />
              </div>
              <div className='w-80 ml-3 mr-3'>
                <Input id='amount' required={true} placeholder='Amount'
                  errors={props.errors} register={props.register}
                  label='Amount' type='number'
                />
              </div>
              <div className='w-80 ml-3'>
                <Select id='paymentMode' required={true} label='Payment Mode'
                  errors={props.errors} register={props.register} onChangeSelect={props.onChangeSelectPay}
                  optionsList={props.listOptpayMode}
                />
              </div>
            </div>

            <div className="mt-5 ml-16 mb-4" style={{ height: 430, width: '91%' }}>
              Invoices
              <DataTable
                rows={props.rows}
                columns={props.columns}
                //rowCount={rowCount}
                //loading={loading}
                rowSelectionModel={props.rowSelectionModel}
                paginationModel={props.paginationModel}
                onPaginationModelChange={props.setPaginationModel}
                //rowCount={rowCountState}
                //loading={isLoading}
                checkboxSelection={props.checkboxSelection}
                setRowSelectionModel={props.setRowSelectionModel}
                rowHeight={30}
              />
            </div>
          </DialogContent>
          <div className='flex justify-center bg-slate-100'>
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
                  <span>{props.payment ? 'Update' : 'Save'}</span>
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

export default PaymentForms;

