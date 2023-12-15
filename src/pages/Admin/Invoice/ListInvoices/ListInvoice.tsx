import React from 'react';
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InvoiceModel from "../../../../models/InvoiceModel.tsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Invoice from '../AddInvoice/Invoice.tsx';
import Imputation from '../Imputation/Imputation.tsx';
import DeleteInvoice from '../DeleteInvoice/DeleteInvoice.tsx';
import DatasTable from "../../../../Components/DatasTable/DatasTable.tsx";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { selectAllInvoices, InvoicesStatus, InvoicesError } from "../../../../Slice/invoiceSlice.js";
import { findAllInvoices } from "../../../../Actions/invoice.action.ts";
import { useAppDispatch, useAppSelector } from "../../../../hooks/hooks.ts";



const ListInvoice = () => {
  const dispatch = useAppDispatch();
  const allInv = useAppSelector(selectAllInvoices)
  const allInvStatus = useAppSelector(InvoicesStatus)
  const allInvError = useAppSelector(InvoicesError)
  /* necessaire pour le DataTable*/
  const [eltSelected, setEltSelected] = useState<number[]>([])
  const [checkedAll, setCheckedAll] = useState<boolean>(false)

  const singleOnChange = (eltId) => {
    let tab = eltSelected
    //console.log((tab.filter(el => el === eltId)).length);

    if ((tab.filter(el => el === eltId)).length > 0) {
      tab = tab.filter(el => el !== eltId)
    } else {
      tab = [...tab, eltId]
    }
    let checkA = tab.length > 0 ? true : false
    setCheckedAll(checkA)
    setEltSelected(tab)
    //console.log(tab);

  }

  const toggleAll = () => {
    let tab: number[] = []
    if (!checkedAll) {
      tab = allInv?.data.map(el => el.id)
    } else {
      tab = []
    }
    //console.log('tab toggleAll', tab);
    setCheckedAll(!checkedAll)
    setEltSelected(tab)
    // setSingleCheck(!checkedAll)
  }
  /* necessaire pour le DataTable*/

  const headers = [
    { value: 'invoiceNumber', label: 'Invoice Number' },
    { value: 'dueDate', label: 'Due Date' },
    { value: 'amount', label: 'Amount' },
    { value: 'balance', label: 'Balance' },
    { value: 'credit_apply', label: 'Apply Credit' },
  ]

  const [loading, setLoading] = useState(false)

  /*to handle pagiantion */
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 25,
  });

  const [rowCountState, setRowCountState] = useState(0);
  /*to handle pagiantion */
  const [rows, setRows] = useState<InvoiceModel[]>([])
  // const [rowSelectionModel, setRowSelectionModel] = useState<
  //   GridRowSelectionModel>([]);
  const [relaodData, setRelaodData] = useState(true)
  const [openModal, setOpenModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [idInvoiceToDel, setIdInvoiceToDel] = useState();
  const [invoiceId, setInvoiceId] = useState<any>(null);
  const [openImputation, setOpenImputation] = useState(false);
  const [nameInv, setNameInv] = useState<string>('');

  const ImputationInv = (id: any) => () => {
    let invRow = allInv?.data.filter(item => item.id === id);
    setNameInv(invRow[0].invoiceNumber)
    setInvoiceId(id)
    setOpenImputation(true)
  }

  const displayModal = () => {
    setOpenModal(true);
  }

  const displayModalUpdate = (id: any) => () => {

    setInvoiceId(id)
    setOpenModal(true);
  }

  const deleteInvoice = (id?: any) => () => {
    setIdInvoiceToDel(id)
    setOpenModalDelete(true)
  };

  const onNotifmodal = (msg: boolean) => {
    setOpenModal(msg)
    setOpenModalDelete(msg)
    setOpenImputation(msg)
    setInvoiceId(null)
    setRelaodData(!relaodData)
  }

  const msgSuccess = (msg: string) => {
    toast.success(
      msg, { position: toast.POSITION.TOP_CENTER }
    )
    setRelaodData(!relaodData)
  }

  useEffect(() => {
    if (allInvStatus === 'init') {
      dispatch(findAllInvoices());
    }
    if (allInvStatus === 'loading') {
      setLoading(true);
    } else if (allInvStatus === 'succeeded') {
      setLoading(false);
    } else if (allInvStatus === 'failed') {
      setLoading(true);
    }
    console.log('allInv =>>', allInv);

  }, [dispatch, allInv]);



  return (
    <div className="p-4 h-full">
      <ToastContainer />
      {openModal && (
        <div>
          <Invoice
            onNotifmodal={onNotifmodal} invoiceId={invoiceId}
            msgSuccess={msgSuccess} rows={allInv?.data}
          />
        </div>
      )}

      {openModalDelete && (
        <div>
          <DeleteInvoice
            onNotifmodal={onNotifmodal}
            idInvoice={idInvoiceToDel}
            msgSuccess={msgSuccess}
          />
        </div>
      )}

      {openImputation && (
        <div>
          <Imputation
            onNotifmodal={onNotifmodal}
            invoiceId={invoiceId}
            nameInv={nameInv}
          />
        </div>
      )}

      <h3 className="flex justify-center text-2x font-bold mb-3">
        INVOICES LIST
      </h3>
      <div className="w-1/6">
        <button
          type="button"
          className="rounded-md bg-white px-2.5 py-2 text-sm font-semibold text-blue-400 ml-4
          shadow-sm ring-1 ring-inset ring-blue-400 hover:bg-blue-50"
          onClick={displayModal}
        >
          <AddOutlinedIcon /> ADD INVOICE
        </button>
      </div>
      <div className="mt-7">
        <DatasTable
          toggleAll={toggleAll}
          checkedAll={checkedAll}
          credit={true}
          actions={true}
          headers={headers}
          content={allInv?.data}
          singleOnChange={singleOnChange}
          imputation={ImputationInv}
          edit={displayModalUpdate}
          loading={loading}
        />
      </div>
    </div>
  );
}


export default ListInvoice;