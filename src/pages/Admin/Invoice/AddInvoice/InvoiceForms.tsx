import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import React from "react";
import Input from "../../../../Components/Input.tsx";
import Select from "../../../../Components/Select.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DataTable from "../../../../Components/DataTable.tsx";
import "./Invoice.css";

const InvoiceForms = (props) => {
  return (
    <div>
      <ToastContainer />
        <h3 className="flex justify-center text-2x font-bold mb-3">
          ADD INVOICES
        </h3>
        <form onSubmit={props.handleSubmit(props.onSubmit)} className='mt-0 w-screen'>
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

            <div className="mt-5 ml-16 mb-4" style={{ height: 430, width: '91%' }}>
              Add Travel Items
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
                  <span>{props.invoice ? 'Update' : 'Save'}</span>
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
     
    </div>
  );
};

export default InvoiceForms;
