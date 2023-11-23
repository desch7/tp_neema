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

export default function Invoice({ onNotifmodal, invoiceId, rows, msgSuccess }) {
  interface optionsSelect {
    label: string;
    value: number;
  }

  const columns: GridColDef[] = [
    {
      field: "ticketNumber",
      headerName: "Ticket Number",
      width: 300,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "travelerName",
      headerName: "Travel Name",
      width: 300,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "itinerary",
      headerName: "Itinerary",
      width: 300,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "totalPrice",
      headerName: "Total Price",
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

  return (
    <div>
      <InvoiceForms
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
