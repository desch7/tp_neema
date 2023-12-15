import { configureStore } from "@reduxjs/toolkit"
import invoiceReducer from "../Slice/invoiceSlice.js"
import  travelItemsReducer  from "../Slice/travelItemsSlice.js"
import customerReducer from "../Slice/customerSlice.js"


const store = configureStore({
  reducer: {
    invoice: invoiceReducer,
    travelItems: travelItemsReducer,
    customer: customerReducer,
  },
  devTools: true,
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store