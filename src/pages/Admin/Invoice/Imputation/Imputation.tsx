import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Imputation.css";
import ImputationModel from "../../../../models/ImputationModel.ts";
import Modal from "../../../../Components/Modal.tsx";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { useAppDispatch, useAppSelector } from "../../../../hooks/hooks.ts";
import { ImputationsError, ImputationsStatus, fecthImputationCompleted, selectAllImputations } from "../../../../Slice/imputationSlice.js";
import { createImputations, findAllImputationByInvoice } from "../../../../Actions/imputation.action.ts";
import { useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

const Imputation = ({ onNotifmodal, invoiceId, nameInv }) => {
    const resetState = 'init'
    const dispatch = useAppDispatch()
    const allImputation = useAppSelector(selectAllImputations)
    const imputaionStat = useAppSelector(ImputationsStatus)
    //const imputationErr = useAppSelector(ImputationsError)
    const imputationErr = useSelector(ImputationsError)

    interface ImptutationModif {
        idPayment: number,
        amountApplied: number,
    }
    const [modal, setModal] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const ImputationForm = useRef<any>()
    const [imputation, setImputation] = useState<ImputationModel>()

    const [creditedAmount, setCreditedAmount] = useState<number>(0)
    const [invoiceBalanceDue, setInvoiceBalanceDue] = useState<number>(0)
    const handleClose = () => {
        setModal(false);
        onNotifmodal(false);
    };

    const handleCreditedAmountDisplay = (e) => {
        let nbreInput = allImputation ? allImputation?.imputations.length : 0
        let creditedA = 0
        for (let i = 0; i < nbreInput; i++) {
            let newValueToApply = ImputationForm.current[i].value
            // get placeholder of input when ref is used in form tag directly
            let oldValueToApply = ImputationForm.current[i].attributes[4].nodeValue
            if (newValueToApply !== '') {
                creditedA += parseInt(newValueToApply)

            } else {
                creditedA += parseInt(oldValueToApply)
            }
            let invAmount = allImputation ? allImputation.invoiceAmount : 0
            setCreditedAmount(creditedA)
            setInvoiceBalanceDue(invAmount - creditedA)
        }
    }

    const handleImputation = (e) => {
        e.preventDefault();
        let tab: ImptutationModif[] = []
        let nbreInput = allImputation ? allImputation?.imputations.length : 0
        for (let i = 0; i < nbreInput; i++) {
            let newValueToApply = ImputationForm.current[i].value
            // get placeholder of input when ref is used in form tag directly
            let oldValueToApply = ImputationForm.current[i].attributes[4].nodeValue
            // get id of input when ref is used in form tag directly
            let payIdInInput = ImputationForm.current[i].attributes[1].nodeValue
            if (oldValueToApply !== newValueToApply && newValueToApply !== '') {
                let paymentId = parseInt(payIdInInput.toString().split('-payId')[1])
                let amountApp = parseFloat(newValueToApply)
                tab.push({ idPayment: paymentId, amountApplied: amountApp })
            }


        }
        console.log('imputationModified => ', tab);
        let imputToCreate = {
            invoiceId: invoiceId,
            imputTab: tab,
        }

        // Fetch for imputation
        if (tab.length > 0 && tab.length) {
            dispatch(createImputations(imputToCreate))
                .then(unwrapResult)
                .then(res => {
                    console.log('res in unwrap =>', res)
                    if (res.status === 'KO') {
                        toast.error(res.msg, { position: toast.POSITION.TOP_CENTER })
                        return
                    } else {
                        onNotifmodal(false)
                    }
                })
                .catch(err => console.error('err in unwrap =>', err))
        }



        // get id of input when ref is used in form tag directly
        //console.log(ImputationForm.current[0].attributes[1].nodeValue.toString().split('-payId')[1]);

        // get placeholder of input when ref is used in form tag directly
        //console.log(ImputationForm.current[0].attributes[4].nodeValue);


    }

    useEffect(() => {
        setLoading(true);
        if (imputaionStat === 'init') {
            console.log('invoice id =>' + invoiceId);
            dispatch(findAllImputationByInvoice(invoiceId));
        } else if (imputaionStat === 'succeeded') {
            console.log('all imputation =>>', allImputation);
            setLoading(false);
            let amount = 0
            allImputation?.imputations?.map(item => {
                amount = amount + item?.amountApplied
            })
            setCreditedAmount(amount)
            setInvoiceBalanceDue(allImputation?.invoiceAmount - amount)
        }

        dispatch(fecthImputationCompleted(resetState))

    }, [dispatch, allImputation])

    return (
        <div>
            <ToastContainer />
            <Modal showModal={modal} close={handleClose}>
                <div className='flex justify-center h-10 bg-slate-100'>
                    <span className='text-base py-1.5 font-black'> Apply credits to {nameInv}</span>
                </div>
                {!loading ? (
                    <form className='mt-7 w-full' ref={ImputationForm}>

                        <div className='flex justify-around'>
                            <div className='w-80 mr-3'>
                            </div>
                            <div className='w-80 ml-3 mr-3'>
                            </div>
                            <div className='w-80 ml-3'>
                                Invoice Amount : {allImputation?.invoiceAmount}
                            </div>
                        </div>

                        <div className="mt-3 mb-4">
                            <div className="lg:-mx-8 bor">

                                <div className="text-gray-900 ">
                                    <div className="  flex justify-center">
                                        <table className=" text-md bg-slate-200 rounded mb-4 w-11/12" >
                                            <thead>
                                                <tr className="">
                                                    <th className="text-left p-3 px-5">Transaction#</th>
                                                    <th className="text-left p-3 px-5">Date</th>
                                                    <th className="text-left p-3 px-5">Amount</th>
                                                    <th className="text-left p-3 px-5">Balance</th>
                                                    <th className="text-left p-3 px-5">
                                                        To Apply
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {allImputation?.imputations?.map((item, index) => {
                                                    //console.log('item', item);
                                                    return (
                                                        <tr
                                                            key={index}
                                                            className="border-b bg-gray-100"
                                                        >
                                                            <td className="px-5 py-1">{item.payment.paymentNumber}</td>
                                                            <td className="px-5 py-1">{item.payment.paymentDate}</td>
                                                            <td className="px-5 py-1">{item.payment.amount}</td>
                                                            <td className="px-5 py-1">{item.payment.balance}</td>
                                                            <td className="px-5 py-1">
                                                                <input type="number"
                                                                    id={`amountApplied-payId${item.payment.id}`}
                                                                    name={`amountApplied-payId${item.payment.id}`}
                                                                    className="shadow appearance-none border rounded 
                                                                        w-full py-1 px-3 text-gray-700 leading-tight 
                                                                        focus:outline-none focus:shadow-outline"
                                                                    onChange={e => handleCreditedAmountDisplay(e)}
                                                                    placeholder={item.amountApplied.toString()}
                                                                ></input>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="flex">
                                    <div className="w-4/6"></div>
                                    <div className="w-2/6 grid align-item-center">
                                        <div className="p-2"> Credited amount : {creditedAmount}</div>
                                        <div className="p-2 border rounded mr-11 bg-gray-100">
                                            Invoice Balance Due: {invoiceBalanceDue}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className=" flex ml-9 mt-5">
                                <div className="px-2">
                                    <button
                                        className="rounded-md bg-white px-2.5 py-1 text-sm text-green-700 ml-4
                                        shadow-sm ring-1 ring-inset ring-green-700 hover:bg-green-50"
                                        onClick={e => handleImputation(e)}
                                        disabled={loading}
                                    >
                                        <SaveOutlinedIcon /><span>APPLY CREDITS</span>
                                    </button>
                                </div>
                                <div className="px-2">
                                    <button
                                        className="rounded-md bg-white px-2.5 py-1 text-sm text-red-700 ml-4
                                        shadow-sm ring-1 ring-inset ring-red-700 hover:bg-red-50"
                                        type="button"
                                        onClick={handleClose}
                                    >
                                        <CancelOutlinedIcon />CANCEL
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                ) : <div>Loading...</div>}
            </Modal>
        </div>
    );
};

export default Imputation;
