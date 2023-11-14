import { useState } from 'react';
import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteInvoice } from '../../../../_service/invoice_service.tsx';
import AlertDeleteInvoices from './AlertDeleteInvoices.tsx';


export default function DeleteInvoice({ onNotifmodal, idInvoice, msgSuccess}) {

    const [modal, setModal] = useState(true)
    const [loading, setLoading] = useState(false)

    const handleClose = () => { 
      setModal(false)
      onNotifmodal(false)
    }

    const deleteInvoiceBut = () =>{
      setLoading(true)
      deleteInvoice(idInvoice).then(res => {
        if (res === 'OK') {
          msgSuccess('Invoice was deleted successfully')
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
    <AlertDeleteInvoices 
      modal={modal} handleClose={handleClose} 
      deleteInvoiceBut={deleteInvoiceBut} 
      loading={loading}
    />
  );
}

