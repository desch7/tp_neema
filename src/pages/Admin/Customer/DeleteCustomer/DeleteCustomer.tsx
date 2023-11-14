import { useState } from 'react';
import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteCustomer } from '../../../../_service/customer_service.tsx';
import AlertDeleteCustomers from './AlertDeleteCustomers.tsx';


export default function DeleteCustomer({ onNotifmodal, idCustomer, msgSuccess}) {

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
    <AlertDeleteCustomers 
      modal={modal} handleClose={handleClose} 
      deleteCustomerBut={deleteCustomerBut} 
      loading={loading}
    />
  );
}

