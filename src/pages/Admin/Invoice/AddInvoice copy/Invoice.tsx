import { useEffect, useState } from "react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  createInvoice,
  findInvoiceById,
  updateInvoice,
} from "../../../../_service/invoice_service.ts";
import { controlFields } from "../../../../_Utils/InvoiceFieldsController.ts";
import InvoiceForms from "./InvoiceForms.tsx";
import {
  GridRowSelectionModel,
  GridColDef,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import { findAllCustomer } from "../../../../_service/customer_service.ts";
import { CreationSelectionList } from "../../../../_Utils/CreationSelectionList.ts";
import InvoiceModel from "../../../../models/InvoiceModel.ts";
import TravelItems from "../../../../models/TravelItems.ts";
import axios from "axios";
import { useParams } from "react-router-dom";
import PaymentModel from "../../../../models/PaymentModel.ts";

export default function Invoices({ onNotifmodal, invoiceId, rows, msgSuccess }) {
  interface optionsSelect {
    label: string;
    value: number;
  }

  const { id } = useParams();
  const trueId = id;

  const [data, setData] = useState<PaymentModel[]>();
  const [invoiceIds, setInvoiceId] = useState([]);

  const columns: GridColDef[] = [
    {
      field: "ticketNumber",
      headerName: "From",
      width: 300,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "travelerName",
      headerName: "Transaction#",
      width: 300,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "itinerary",
      headerName: "Date",
      width: 300,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "totalPrice",
      headerName: "Montant",
      width: 300,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "totalPrice",
      headerName: "Solde à payer",
      width: 300,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "totalPrice",
      headerName: "To Apply",
      width: 300,
      align: "left",
      headerAlign: "left",
    },
  ];

  const fakeRows = [
    {
      id: 0,
      ticketNumber: "TCK-001",
      travelerName: "Travel 1",
      itinerary: "BE-CA",
      totalPrice: 10000.0,
    },
  ];

  const fakeRowsPaiements = [
    {
      ID: 0,
      Number: 25,
      Date: "Paiement-001",
      Id_customer: 35,
      Amount: "BE-CA",
      Balance: 10000.0,
    },
    {
      ID: 1,
      Number: 14,
      Date: "Paiement-002",
      Id_customer: 35,
      Amount: "BE-CA",
      Balance: 10000.0,
    },
    {
      ID: 2,
      Number: 20,
      Date: "Paiement-021",
      Id_customer: 35,
      Amount: "BE-CA",
      Balance: 10000.0,
    },
    {
      ID: 3,
      Number: 3,
      Date: "Paiement-501",
      Id_customer: 35,
      Amount: "BE-CA",
      Balance: 10000.0,
    },
  ];
  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>([]);
  const [modal, setModal] = useState(true);
  const [loading, setLoading] = useState(false);
  const [listOptCustomer, setListOptCustomer] = useState<optionsSelect[]>([]);
  const [invoice, setInvoice] = useState<InvoiceModel>();
  const [travelItemsRows, setTravelItemsRows] = useState<TravelItems[]>([]);
  const [custId, setCustId] = useState<number>();

  const handleClose = () => {
    setModal(false);
    onNotifmodal(false);
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    data.idCustomer = custId;
    setLoading(true);
    let crtlFields = controlFields(data, rowSelectionModel);
    if (invoiceId) {
      // Update invoice
      if (crtlFields !== "OK") {
        toast.error(crtlFields, { position: toast.POSITION.TOP_CENTER });

        setLoading(false);
        return;
      }
      console.log(JSON.stringify(data));
      updateInvoice(data).then((response) => {
        if (response === "OK") {
          msgSuccess("Invoice was updated successfully");
          setModal(false);
          onNotifmodal(false);
        } else {
          toast.error("The server is not available or something went wrong!", {
            position: toast.POSITION.TOP_CENTER,
          });
          setLoading(false);
        }
      });
    } else {
      //insert invoice
      data.IdCustomer = custId;

      if (crtlFields !== "OK") {
        toast.error(crtlFields, { position: toast.POSITION.TOP_CENTER });

        setLoading(false);
        return;
      }
      console.log("rowSelectionModel ", rowSelectionModel);

      let travelItemsSelected = travelItemsRows.filter((travelItem) =>
        rowSelectionModel.includes(travelItem.id)
      );
      data.travelItems = travelItemsSelected;

      console.log("In insert =>", JSON.stringify(data));

      createInvoice(data).then((response) => {
        if (response === "OK") {
          msgSuccess("Invoice was created successfully");
          setModal(false);
          onNotifmodal(false);
        } else {
          toast.error("The server is not available or something went wrong!", {
            position: toast.POSITION.TOP_CENTER,
          });
          setLoading(false);
        }
      });
    }
  };

  const onChangeSelect = (e) => {
    console.log("Onchange launched ", e.target.value);
    setCustId(e.target.value);
  };

  useEffect(() => {
    findAllCustomer().then((data) =>
      setListOptCustomer(
        CreationSelectionList({
          rows: data,
          value: "id",
          label: "customerName",
        })
      )
    );
    if (invoiceId) {
      findInvoiceById(invoiceId).then((invoice) => setInvoice(invoice));
      setValue("idCustomer", invoice?.idCustomer);
      setValue("dueDate", invoice?.dueDate);
    }
  }, [invoiceId]);

  function handleSubmits(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    axios.post('https://api-airbook.onrender.com/invoicepaymentreceivedsmultiple', invoiceId)
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err))
  }

  function handleChange(event, val) {
    console.log(val);
    console.log(event.target.value);
    console.log(id);
    const amount = event.target.value;
    //const id_pay = parseInt(val);
    const id_pay = val;

    // const filtered = invoiceId.filter(inv => inv.Id_payment_received.includes(val));
    //let filterV = [{}];
    // filterV = filtered
    // console.log(filterV)

    const inv = invoiceId;


    const anyKeyFilter = (item) => (obj) => Object.values(obj).includes(item);
    const filtered = inv.filter(anyKeyFilter(id_pay));
    console.log("filtre ==", filtered);
    if (filtered.length > 0) {
      inv.map((item) => {
        if (item.Id_payment_received === id_pay) {
          item.Amount_apply = amount;
        }
      })
      console.log('go')
    } else {
      inv.push({ id_invoice: trueId, Amount_apply: amount, Id_payment_received: id_pay });
      setInvoiceId(inv);
    }

    console.log("invoiceId == ", invoiceId);
  }

  return (
    <div>
      <InvoiceForms
        data={fakeRowsPaiements}
        handleChange={handleChange}
        handleSubmits={handleSubmits}
        modal={modal}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        errors={errors}
        onSubmit={onSubmit}
        register={register}
        loading={loading}
        listOptCustomer={listOptCustomer}
        rows={fakeRows}
        invoice={invoice}
        columns={columns}
        checkboxSelection={true}
        setRowSelectionModel={setRowSelectionModel}
        onChangeSelect={onChangeSelect}
      />
    </div>
  );
}


