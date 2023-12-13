import { CREATEINVOICE, FINDALLINVOICE } from "../Actions/invoice.action.ts";

const initialState = {}

const invoiceReducer = (state = initialState, action) => {
    switch (action.type) {
        case FINDALLINVOICE:
            return action.payload;
        case CREATEINVOICE:
            return [action.payload, ...state];
        default:
            return state;
    }
 }
export default invoiceReducer