import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import rootReducer from "./Reducers/index.ts"
import { findAllInvoice } from './Actions/invoice.action.ts';

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
})

store.dispatch(findAllInvoice())

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

