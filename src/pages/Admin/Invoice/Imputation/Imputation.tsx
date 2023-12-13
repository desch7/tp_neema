import React, { useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Imputation.css";
import { createImputations, findAllImputationByInvoice } from "../../../../_service/imputation_service.ts";
import ImputationModel from "../../../../models/ImputationModel.ts";
import Modal from "../../../../Components/Modal.tsx";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';

const Imputation = ({ onNotifmodal, invoiceId, nameInv }) => {
    interface ImptutationModif {
        idPayment: number,
        amountApplied: number,
    }
    const [modal, setModal] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const ImputationForm = useRef<any>()
    const [imputation, setImputation] = useState<ImputationModel>()
    // {
    //     idInvoice: 0,
    //         invoiceAmount: 10,
    //             imputations: [
    //                 {
    //                     payment: {
    //                         id: 1,
    //                         paymentDate: '2017-12-12',
    //                         paymentNumber: "PER-001",
    //                         amount: 150.00, // float
    //                         balance: 100.00
    //                     },
    //                     amountApplied: 12,
    //                 },
    //                 {
    //                     payment: {
    //                         id: 2,
    //                         paymentDate: '2017-12-12',
    //                         paymentNumber: "PER-001",
    //                         amount: 170.00, // float
    //                         balance: 100.00
    //                     },
    //                     amountApplied: 14,
    //                 },
    //             ]
    // }
    const [creditedAmount, setCreditedAmount] = useState<number>(0)
    const [invoiceBalanceDue, setInvoiceBalanceDue] = useState<number>(0)
    const handleClose = () => {
        setModal(false);
        onNotifmodal(false);
    };

    const data = [
        {
            ID: 0,
            Number: 25,
            Date: "Paiement-001",
            Id_customer: "2023-11-11",
            Amount: "BE-CA",
            Balance: 10000.0,
        },
        {
            ID: 1,
            Number: 14,
            Date: "Paiement-002",
            Id_customer: "2023-11-11",
            Amount: "BE-CA",
            Balance: 10000.0,
        },
        {
            ID: 2,
            Number: 20,
            Date: "Paiement-021",
            Id_customer: "2023-11-11",
            Amount: "BE-CA",
            Balance: 10000.0,
        },
        {
            ID: 3,
            Number: 3,
            Date: "Paiement-501",
            Id_customer: "2023-11-11",
            Amount: "BE-CA",
            Balance: 10000.0,
        },
    ];

    // const handleApply = (e, paymentId) => {
    //     e.preventDefault();
    //     // find if the payment is already present in the list of payments modified from To Apply input
    //     let filteredTab = imputationModified.filter(item => item.idPayment === paymentId)
    //     // if the payment is present
    //     if (filteredTab.length && filteredTab.length === 1) {
    //         // modified the value from the to apply input
    //         let tab = imputationModified.map(item => {
    //             if (item.idPayment === paymentId) {
    //                 item.amountApplied = parseFloat(e.target.value)
    //                 return item;
    //             } else {
    //                 return item;
    //             }
    //         })
    //         setImputationModified(tab)
    //     } else {
    //         // if the payment isn't present insert the paymentId and the value of To Apply input in the list of payments modified
    //         let tab = imputationModified
    //         tab.push({ idPayment: paymentId, amountApplied: parseFloat(e.target.value) })
    //         setImputationModified(tab)
    //     }

    // }

    const handleCreditedAmountDisplay = (e) => {
        let nbreInput = imputation ? imputation?.imputations.length : 0
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
            let invAmount = imputation ? imputation.invoiceAmount : 0
            setCreditedAmount(creditedA)
            setInvoiceBalanceDue(invAmount - creditedA)
        }
    }

    const handleImputation = () => {
        setLoading(true)
        let tab: ImptutationModif[] = []
        let nbreInput = imputation ? imputation?.imputations.length : 0
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

        // Fetch for imputation
        if (tab.length > 0 && tab.length) {
            createImputations(tab, invoiceId)
                .then(resp => console.log('resultat imputation => ', resp)
                )
        }
        onNotifmodal(false)

        // get id of input when ref is used in form tag directly
        //console.log(ImputationForm.current[0].attributes[1].nodeValue.toString().split('-payId')[1]);

        // get placeholder of input when ref is used in form tag directly
        //console.log(ImputationForm.current[0].attributes[4].nodeValue);


    }

    useEffect(() => {
        setLoading(true)
        findAllImputationByInvoice(invoiceId).then(res => {
            console.log('All imputation in useEffect => ' + res);

            setImputation(res)
            let amount = 0
            res?.imputations?.map(item => {
                amount = amount + item?.amountApplied
            })
            setCreditedAmount(amount)
            setInvoiceBalanceDue(res?.invoiceAmount - amount)
        })
        setLoading(false)

    }, [])

    return (
        <div>
            <ToastContainer />
            <Modal showModal={modal} close={handleClose}>
                <div className='flex justify-center h-10 bg-slate-100'>
                    <span className='text-base py-1.5 font-black'> Apply credits to {nameInv}</span>
                </div>
                <form className='mt-7 w-full' ref={ImputationForm}>

                    <div className='flex justify-around'>
                        <div className='w-80 mr-3'>
                        </div>
                        <div className='w-80 ml-3 mr-3'>
                        </div>
                        <div className='w-80 ml-3'>
                            Invoice Amount : {imputation?.invoiceAmount}
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
                                            {imputation?.imputations?.map((item, index) => {
                                                {/* {data?.map((item, index) => { */ }
                                                console.log('item', item);
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
                                    onClick={handleImputation}
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
            </Modal>
        </div>
    );
};

export default Imputation;
