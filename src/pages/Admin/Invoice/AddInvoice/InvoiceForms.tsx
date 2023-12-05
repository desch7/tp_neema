
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


const InvoiceForms = (props) => {
  return (
    <div>
      <ToastContainer />
      <Dialog
        maxWidth="xl"

        open={props.modal}
        onClose={props.handleClose}
      >
        <DialogTitle className='flex justify-center h-10 bg-slate-100'>
          <span className='text-base font-black'>{props.invoiceId ? 'Edit Invoice' : 'New Invoice'}</span>
        </DialogTitle>
        <form onSubmit={props.handleSubmit(props.onSubmit)} className='mt-0 w-full'>
          <DialogContent className=''>
            <div className='flex justify-around'>
              <div className='w-80 mr-3'>
                <Select id='idCustomer' errors={props.errors}
                  required={true} register={props.register} onChangeSelect={props.onChangeSelect}
                  label='Customer Account' optionsList={props.listOptCustomer}
                />

              </div>
              <div className='w-80 ml-3 mr-3'>
                <Input id='dueDate'
                  errors={props.errors} required={true} label='Due Date'
                  register={props.register} type='date'
                />
              </div>
              <div className='w-80 ml-3'>
                <Input id='creationDate'
                  errors={props.errors} required={true} label='Creation Date'
                  register={props.register} type='date'
                />
              </div>
            </div>

            <div className="mt-2 ml-16 mb-4" style={{ height: 400, width: '91%' }}>
              <span className='text-base'>Add Travel Items</span>
              <DataTable
                rows={props.rows}
                columns={props.columns}
                rowCount={props.rowCount}
                loading={props.loading}
                rowSelectionModel={props.rowSelectionModel}
                paginationModel={props.paginationModel}
                onPaginationModelChange={props.onPaginationModelChange}
                //rowCount={rowCountState}
                //loading={isLoading}
                checkboxSelection={props.checkboxSelection}
                setRowSelectionModel={props.setRowSelectionModel}
                rowHeight={30}
              />
            </div>
          </DialogContent>
          <div className='flex justify-center'>
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
                  <span>{props.invoiceId ? 'Update' : 'Save'}</span>
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

