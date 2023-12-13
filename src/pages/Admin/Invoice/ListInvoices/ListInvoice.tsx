import {
  GridRowSelectionModel, GridColDef, GridActionsCellItem, GridPaginationModel,
} from "@mui/x-data-grid";
import React, { useRef } from 'react';
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { findAllInvoice } from "../../../../_service/invoice_service.ts";
import InvoiceModel from "../../../../models/InvoiceModel.tsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Invoice from '../AddInvoice/Invoice.tsx';
import Imputation from '../Imputation/Imputation.tsx';
import DeleteInvoice from '../DeleteInvoice/DeleteInvoice.tsx';
import DatasTable from "../../../../Components/DatasTable/DatasTable.tsx";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { useSelector } from "react-redux";



const ListInvoice = () => {
  //store.dispatch(findAllInvoice())
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
      tab = rows.map(el => el.id)
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


  // const columns: GridColDef[] = [
  //   {
  //     field: "invoiceNumber", headerName: "Invoice Number",
  //     width: 200, align: 'left', headerAlign: 'left',
  //   },
  //   {
  //     field: "creationDate", headerName: "Creation Date",
  //     width: 150, align: 'left', headerAlign: 'left',
  //   },
  //   {
  //     field: "dueDate", headerName: "Due Date",
  //     width: 150, align: 'left', headerAlign: 'left',
  //   },
  //   {
  //     field: "amount", headerName: "Amount",
  //     width: 170, align: 'left', headerAlign: 'left',
  //   },
  //   {
  //     field: "balance", headerName: "Balance",
  //     width: 170, align: 'left', headerAlign: 'left',
  //   },
  //   {
  //     field: "credit_apply", headerName: "Apply Credit",
  //     width: 150, align: 'left', headerAlign: 'left',
  //   },
  //   {
  //     field: "actions", type: "actions", headerName: "Actions",
  //     width: 150, cellClassName: "actions", align: 'center',
  //     getActions: ({ id }) => {
  //       return [
  //         <div className="flex ">
  //           <div className="w-12">
  //             <GridActionsCellItem
  //               icon={<EditIcon />} label="Edit" className="textPrimary"
  //               onClick={displayModalUpdate(id)} color="inherit"
  //             />
  //           </div>
  //           <div className="w-12">
  //             <GridActionsCellItem
  //               icon={<PaymentIcon />}
  //               label="Imputation"
  //               onClick={ImputationInv(id)}
  //               color="inherit"
  //             />
  //           </div>
  //           <div className="w-12">
  //             <GridActionsCellItem
  //               icon={<DeleteIcon />} label="Delete"
  //               onClick={deleteInvoice(id)} color="inherit"
  //             />
  //           </div>
  //         </div>
  //       ];
  //     }
  //   }
  // ];

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
    let invRow = rows.filter(item => item.id === id);
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

  /*to handle pagiantion */
  const handlePaginationChange = (newPaginationModel: GridPaginationModel) => {
    console.log('Pagination changed before:', paginationModel)
    setPaginationModel(newPaginationModel);
    console.log('Pagination changed after:', paginationModel)
    console.log('Pagination changed variable direct:', newPaginationModel)
    setLoading(true)

    findAllInvoice(newPaginationModel)
      .then(resp => {
        if (resp?.data?.length > 0 && resp?.data?.length) {
          setRows(resp.data)
          setRowCountState((prevRowCountState) =>
            rowCountState !== undefined
              ? resp.totalRowCount
              : prevRowCountState,
          )
        }
        setLoading(false)
      })

  }
  /*to handle pagiantion */
  const allInv = useSelector(state => state.invoiceReducer)

  useEffect(() => {

    console.log('allInv =>>', allInv);

    /*to handle pagiantion */
    setLoading(true)
    // if (allInv?.data?.length > 0 && allInv?.data?.length) {
    //   setRows(allInv.data)
    // }
    setLoading(false)

    /*to handle pagiantion */


  }, [relaodData]);


  return (
    <div className="p-4 h-full">
      <ToastContainer />
      {openModal && (
        <div>
          <Invoice
            onNotifmodal={onNotifmodal} invoiceId={invoiceId}
            msgSuccess={msgSuccess} rows={rows}
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

      {/* <div className="mt-2" style={{ height: 525, width: '100%' }}>
        <DataTable
          rows={rows}
          columns={columns}
          rowCount={rowCountState}
          loading={loading}
          rowSelectionModel={rowSelectionModel}
          onPaginationModelChange={handlePaginationChange}
          paginationModel={paginationModel}
          checkboxSelection={false}
          rowHeight={30}
          setRowSelectionModel={setRowSelectionModel}
        />
      </div> */}
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