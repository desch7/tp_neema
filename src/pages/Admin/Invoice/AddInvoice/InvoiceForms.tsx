
import React from 'react';
import Input from '../../../../Components/Input.tsx';
import Select from '../../../../Components/Select.tsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from '../../../../Components/Modal.tsx';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import DatasTable from '../../../../Components/DatasTable/DatasTable.tsx';


const InvoiceForms = (props) => {

  return (
    <div>
      <ToastContainer />
      <Modal showModal={props.modal} close={props.handleClose}>
        <div className='flex justify-center h-10 bg-slate-100'>
          <span className='text-base py-1.5 font-black'>{props.invoiceId ? 'Edit Invoice' : 'New Invoice'}</span>
        </div>
        <form onSubmit={props.handleSubmit(props.onSubmit)} className='mt-5 w-full'>

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
            <DatasTable
              toggleAll={props.toggleAll}
              checkedAll={props.checkedAll}
              credit={false}
              actions={false}
              headers={props.headers}
              content={props.content}
              singleOnChange={props.singleOnChange}
              imputation={props.none}
              edit={props.none}
              loading={props.loading}
            />
          </div>

          <div className='flex justify-center mt-14 mb-3'>

            <div className='mr-10'>
              <button
                className="rounded-md bg-white px-2.5 py-1 text-sm text-green-700 ml-4
          shadow-sm ring-1 ring-inset ring-green-700 hover:bg-green-50"
                type="submit"
                disabled={props.loading}
              >
                <SaveOutlinedIcon />SAVE
              </button>
            </div>
            <div className='mr-10'>
              <button
                className="rounded-md bg-white px-2.5 py-1 text-sm text-red-700 ml-4
          shadow-sm ring-1 ring-inset ring-red-700 hover:bg-red-50"
                type="button"
                onClick={props.handleClose}
              >
                <CancelOutlinedIcon />CANCEL
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default InvoiceForms;

