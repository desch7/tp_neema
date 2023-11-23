import React from "react";
import { Routes, Route } from "react-router-dom";
import ALayout from "./ALayout.tsx";
import Dashboard from "./Dashboard.tsx";
import Error from "../../_Utils/Error.tsx";
import ListCustomer from "./Customer/ListCusctomers/ListCustomer.tsx";
import ListInvoice from "./Invoice/ListInvoices/ListInvoice.tsx";
import ListPayment from "./Payment/ListPayments/ListPayment.tsx";
import Payment from "./Payment/AddPayment/Payment.tsx";

const AdminRouter = () => {
  return (
    <Routes>
      <Route element={<ALayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="customers" element={<ListCustomer />} />
        <Route path="invoices" element={<ListInvoice />} />
        <Route path="payments">
          <Route index element={<ListPayment />} />
          <Route path="add" element={<Payment />} />
          <Route path="edit/:uid" element={<Payment />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
};

export default AdminRouter;
