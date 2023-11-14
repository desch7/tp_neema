
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useEffect, useState } from 'react';
import React from 'react';
import Input from './Input.tsx';
import Select from './Select.tsx';
import Checkbox from './Checkbox.tsx';
import Textarea from './Textarea.tsx';
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function CustomerForm({ onNotifmodal, customer, rows, msgSuccess}) {

   const [modal, setModal] = useState(true)
   const [loading, setLoading] = useState(false)

  const handleClose = () => { 
    setModal(false)
    onNotifmodal(false)
  }

  interface optionsLanguage {
    label: string,
    value: string,
}

const listOptLang: optionsLanguage[] = [
    {
        label: 'Francais',
        value: 'fr'
    },
    {
        label: 'English',
        value: 'en'
    }
]

    const { register, handleSubmit, setValue, formState:{ errors }} = useForm();

    const onSubmit = async (data:any) => {
        setLoading(true)
        data.idCurrency = 272
        data.slug = parseInt(data.slug)
        data.terms = parseInt(data.terms)
        data.idCountry = 2
        data.isActive = false
        console.log(JSON.stringify(data))
        if (customer) {
            // Update customer
            const newRows = rows.filter(row =>row.id !== customer.id)
            if (newRows.filter(row =>row.tmcClientNumber === data.tmcClientNumber).length > 0) {
                toast.error('Fields TMC Client Number is already in use. Must be unique',
                    {position: toast.POSITION.TOP_CENTER})
                
                setLoading(false)
                return
            }
            if (newRows.filter(row =>row.terms === data.terms).length > 0) {
                toast.error('Fields Terms is already in use. Must be unique',
                    {position: toast.POSITION.TOP_CENTER})
                
                setLoading(false)
                return
            }
            if (newRows.filter(row =>row.alias === data.alias).length > 0) {
                toast.error('Fields Alias is already in use. Must be unique',
                    {position: toast.POSITION.TOP_CENTER})
                
                setLoading(false)
                return
            }
            if (newRows.filter(row =>row.abKey === data.abKey).length > 0) {
                toast.error('Fields Ab Key is already in use. Must be unique',
                    {position: toast.POSITION.TOP_CENTER})
                
                setLoading(false)
                return
            }
            await fetch(`${process.env.REACT_APP_BASE_ENDPOINT}/customers/` + customer.id,{
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            .then((response) => {
                console.log(response)
                if (!response.ok) {
                    toast.error('Something went wrong!',
                    {position: toast.POSITION.TOP_CENTER})
                    
                    setLoading(false)
                    return
                }
                msgSuccess('Customer was updated successfully')
                setModal(false)
                onNotifmodal(false)
                 })
            .catch((err) => {
                console.log(err)
                toast.error('The server is not available!',
                    {position: toast.POSITION.TOP_CENTER})
            })

        }else{
            //insert customer
            if (rows.filter(row =>row.tmcClientNumber === data.tmcClientNumber).length > 0) {
                toast.error('Fields TMC Client Number is already in use. Must be unique',
                    {position: toast.POSITION.TOP_CENTER})
                
                setLoading(false)
                return
            }
            if (rows.filter(row =>row.terms === data.terms).length > 0) {
                toast.error('Fields Terms is already in use. Must be unique',
                    {position: toast.POSITION.TOP_CENTER})
                
                setLoading(false)
                return
            }
            if (rows.filter(row =>row.alias === data.alias).length > 0) {
                toast.error('Fields Alias is already in use. Must be unique',
                    {position: toast.POSITION.TOP_CENTER})
                
                setLoading(false)
                return
            }
            if (rows.filter(row =>row.abKey === data.abKey).length > 0) {
                toast.error('Fields Ab Key is already in use. Must be unique',
                    {position: toast.POSITION.TOP_CENTER})
                
                setLoading(false)
                return
            }
            await fetch(`${process.env.REACT_APP_BASE_ENDPOINT}/customers`,{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            .then((response) => {
                console.log(response)
                if (!response.ok) {
                    toast.error('Something went wrong!',
                    {position: toast.POSITION.TOP_CENTER})
                    
                    setLoading(false)
                    return
                }
                msgSuccess('Customer was updated successfully')
                setModal(false)
                onNotifmodal(false)
                 })
            .catch((err) => {
                console.log(err)
                toast.error('The server is not available!',
                    {position: toast.POSITION.TOP_CENTER})
            })
        }

    };

    useEffect(() => {
        if (customer) {
            
            setValue("customerName", customer.customerName)
            setValue("street", customer.street)            
            setValue("city", customer.city)
            setValue("state", customer.state)
            setValue("zipCode", customer.zipCode)
            setValue("notes", customer.notes)
            setValue("terms", customer.terms)
            setValue("accountNumber", customer.accountNumber)
            setValue("isSubAgency", customer.isSubAgency)
            setValue("language", customer.language)
            setValue("slug", customer.slug)
            setValue("agency", customer.agency)
            setValue("alias", customer.alias)
            setValue("abKey", customer.abKey)
            setValue("tmcClientNumber", customer.tmcClientNumber)           
        }
    }, [customer])


  return (
    <div>
     <ToastContainer />
      <Dialog
        maxWidth="100%"
        //maxHeight="100%"
        open={modal}
        onClose={handleClose}
      >
        <DialogTitle className='flex justify-center bg-slate-100'>New Customer</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>       
            <DialogContent>
              <div className='flex justify-around'>
                <div className='w-80 mr-3'>
                    <Input id='customerName' errors={errors} required={true} placeholder='Customer Name'  register={register} label='Customer Name' type='text'/>
                    <Input id='accountNumber' errors={errors} placeholder='Account Number'  register={register} label='Account Number' type='text'/>
                    <Input id='terms' placeholder='Terms' errors={errors} label='Terms'  register={register} type='number'/>
                    <Input id='tmcClientNumber' required={true} placeholder='TCM Client Number' errors={errors} register={register} label='TCM Client Number' type='text'/>
                    {/* <Input id='balance' placeholder='Balance' label='Balance'  type='text'/> */}
                    {/* <Input id='creditLim' placeholder='Credit Limit'  label='Credit Limit' type='text'/> */}
                    <Input id='slug' placeholder='Slug' errors={errors} required={true} label='Slug' register={register} type='number'/>
                    {/* <Input id='IRSKey' placeholder='IRS Share Key'  label='IRS Share Key' type='text'/> */}
                </div>
                <div className='w-80 ml-3 mr-3'>
                    <Checkbox id='isSubAgency' errors={errors} required={true} label='Sub-Agency' register={register} type='checkbox'/>
                    <Input id='agency' placeholder='Agency' errors={errors} register={register} label='Agency' type='text'/>
                    <Input id='abKey' required={true} placeholder='Ab Key' errors={errors} register={register} label='Ab Key' type='text'/>
                    {/* <Input id='openingBl' placeholder='Opening Balance'  label='Opening Balance' type='text'/> */}
                    {/* <Input id='OpeningBlDate' placeholder='Opening Balance Date'  label='Opening Balance Date' type='date'/> */}
                    <Input id='alias' required={true} placeholder='Alias' errors={errors} register={register} label='Alias'/>
                    <Textarea id='notes' errors={errors} placeholder='Notes' register={register} label='Notes'/>
                </div>
                <div className='w-80 ml-3'>
                    <Input id='street' placeholder='Street' errors={errors} register={register} label='Street' type='text'/>
                    <Input id='city' placeholder='City' errors={errors} register={register} label='City' type='text'/>
                    <Input id='state' placeholder='State' errors={errors} register={register} label='State' type='text'/>
                    <Input id='zipCode' placeholder='Zip Code'errors={errors}  register={register} label='Zip Code' type='text'/>
                    <Select id='language' label='Language' errors={errors} register={register} optionsList={listOptLang}/>
                </div>
              </div>
            </DialogContent>
            <div className='flex justify-center bg-slate-100'>         
              <DialogActions>
                <div className='mr-10'>
                  <LoadingButton
                  size="small"
                  color="success"
                  //onClick={handleClick}
                  loading={loading}
                  loadingPosition="start"
                  startIcon={<SaveIcon />}
                  variant="outlined"
                  type="submit"
                  >
                  <span>{customer? 'Update' : 'Save'}</span>
                  </LoadingButton>
                </div>
                <Button 
                size="small" 
                color="error"
                variant="outlined"//"contained"
                startIcon={<CancelIcon />} 
                onClick={handleClose}
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

