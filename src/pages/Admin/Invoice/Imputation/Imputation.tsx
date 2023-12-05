import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import LoadingButton from "@mui/lab/LoadingButton";
import PaymentIcon from '@mui/icons-material/Payment';
import CancelIcon from "@mui/icons-material/Cancel";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Imputation.css";

const Imputation = ({ onNotifmodal }) => {
    const [modal, setModal] = useState(true);
    const [loading, setLoading] = useState(false);
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

    return (
        <div>
            <ToastContainer />
            <Dialog
                maxWidth="xl"
                open={modal}
                onClose={handleClose}
            >
                <DialogTitle className='flex justify-center bg-slate-100'>
                    Apply credits to Num INV
                </DialogTitle>
                <form className='mt-0 w-full'>
                    <DialogContent className=''>
                        <div className='flex justify-around'>
                            <div className='w-80 mr-3'>
                            </div>
                            <div className='w-80 ml-3 mr-3'>
                            </div>
                            <div className='w-80 ml-3'>
                                Invoice Balance [XOF]: 707.226.46
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
                                                {data?.map((item, index) => {
                                                    console.log(item);
                                                    return (
                                                        <tr
                                                            key={index}
                                                            className="border-b bg-gray-100"
                                                        >
                                                            <td className="p-3 px-5">{item.Date}</td>
                                                            <td className="p-3 px-5">{item.Id_customer}</td>
                                                            <td className="p-3 px-5">{item.Amount}</td>
                                                            <td className="p-3 px-5">{item.Balance}</td>
                                                            <td className="p-3 px-5">
                                                                <input type="number"/* onChange={(e) => props.handleChange(e, item.ID)} */
                                                                    name="Amount"
                                                                    className="shadow appearance-none border rounded 
                                          w-full py-2 px-3 text-gray-700 leading-tight 
                                          focus:outline-none focus:shadow-outline"
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
                                        <div className="p-2">Amount to Credit: 0</div>
                                        <div className="p-2 border rounded mr-11 bg-gray-100">
                                            Invoice Balance Due: 0,00
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className=" flex ml-9 mt-5">
                                <div className="px-2">
                                    <LoadingButton
                                        size="small"
                                        color="success"
                                        loading={loading}
                                        loadingPosition="start"
                                        startIcon={<PaymentIcon />}
                                        variant="outlined"
                                        type="submit"
                                    >
                                        <span>Apply credits</span>
                                    </LoadingButton>
                                </div>
                                <div className="px-2">
                                    <Button
                                        size="small"
                                        color="error"
                                        variant="outlined"
                                        startIcon={<CancelIcon />}
                                        onClick={handleClose}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                </form>
            </Dialog>
        </div>
    );
};

export default Imputation;
