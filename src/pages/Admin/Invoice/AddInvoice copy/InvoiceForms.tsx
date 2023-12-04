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
import { FaFileInvoiceDollar, FaRegCreditCard } from "react-icons/fa";
import { Link } from "react-router-dom";

const InvoicesForms = (props) => {
  return (
    <div>
      <ToastContainer />
      <Dialog
        maxWidth="xl"
        className="diag"
        open={props.modal}
        onClose={props.handleClose}
      >
        <DialogTitle className='flex justify-center bg-slate-100'>
          Appliquer des Drédits
        </DialogTitle>
        <form onSubmit={props.handleSubmits} ref={props.formRef} className='mt-0 w-screen'>
          <DialogContent className=''>
            <div className='flex justify-around'>
              <div className='w-80 mr-3'>
                {/* <Select id='idCustomer' errors={props.errors}
                  required={true} register={props.register} onChangeSelect={props.onChangeSelect}
                  label='Customer Account' optionsList={props.listOptCustomer}
                /> */}

              </div>
              <div className='w-80 ml-3 mr-3'>
                {/* <Input id='dueDate'
                  errors={props.errors} required={true} label='Due Date'
                  register={props.register} type='date'
                /> */}
              </div>
              <div className='w-80 ml-3'>
                Invoice Balance [XOF]: 707.226.46
              </div>
            </div>

            <div className="mt-5 mb-4" style={{ height: 450, width: '100%' }}>
              {/* <DataTable
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
              /> */}
              <div className=" w-full ">
                <div className="flex flex-col">
                  <div className="lg:-mx-8 bor">
                    <div className="inline-block min-w-full py-2 bor">
                      <div className="text-gray-900 bg-white">
                        <div className=" py-4 flex justify-center">
                          <table className="w-full text-md bg-blue-200 shadow-md rounded mb-4">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left p-3 px-5">From</th>
                                <th className="text-left p-3 px-5">Transaction#</th>
                                <th className="text-left p-3 px-5">Date</th>
                                <th className="text-left p-3 px-5">Montant</th>
                                <th className="text-left p-3 px-5">Solde à payer	</th>
                                <th className="text-left p-3 px-5">
                                  To Apply
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {props.data?.map((item, index) => {
                                console.log(item);
                                return (
                                  <tr
                                    key={index}
                                    className="border-b hover:bg-orange-100 bg-gray-100"
                                  >
                                    <td className="p-3 px-5">{item.Number}</td>
                                    <td className="p-3 px-5">{item.Date}</td>
                                    <td className="p-3 px-5">{item.Id_customer}</td>
                                    <td className="p-3 px-5">{item.Amount}</td>
                                    <td className="p-3 px-5">{item.Balance}</td>
                                    <td className="p-3 px-5">
                                      <input /* onChange={(e) => props.handleChange(e, item.ID)} */
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
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <div className="w-4/6"></div>
                  <div className="w-2/6 grid align-item-center">
                    <div>Amount to Credit: 0</div>
                    <div className="p-2 border rounded w-96 h-full bg-gray-100">
                      Solde de facture dû: 0,00
                    </div>
                  </div>
                </div>
              </div>
              <div className=" w-full  flex">
                <div className="h-full w-full flex items-center">
                  <div className="px-2">
                    <button
                      className="flex bg-blue-500 
                        hover:bg-blue-700 text-white 
                        font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="submit"
                    >
                      Utiliser credit
                      <div className="px-2 pt-1">
                        <FaRegCreditCard />
                      </div>
                    </button>
                  </div>
                  <div className="px-2">
                    <Link
                      to={"/Liste des factures"}
                      className="flex bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Factures
                      <div className="px-2 pt-1">
                        <FaFileInvoiceDollar />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
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
      </Dialog>
    </div>
  );
};

export default InvoicesForms;
