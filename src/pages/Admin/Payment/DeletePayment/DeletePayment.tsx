import { useState } from 'react';
import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deletePayment } from '../../../../_service/payment_service.tsx';
import AlertDeletePayments from './AlertDeletePayments.tsx';


export default function DeletePayment({ onNotifmodal, idPayment, msgSuccess}) {

    const [modal, setModal] = useState(true)
    const [loading, setLoading] = useState(false)

    const handleClose = () => { 
      setModal(false)
      onNotifmodal(false)
    }

    const deletePaymentBut = () =>{
      setLoading(true)
      deletePayment(idPayment).then(res => {
        if (res === 'OK') {
          msgSuccess('Payment was deleted successfully')
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
    <AlertDeletePayments 
      modal={modal} handleClose={handleClose} 
      deletePaymentBut={deletePaymentBut} 
      loading={loading}
    />
  );
}

