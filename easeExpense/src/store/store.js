import { configureStore } from "@reduxjs/toolkit";
import budgetSlice from "./budgetSlice";
import transactionSlice from "./transactionSlice";

const store = configureStore({
  reducer: {
    budgetSlice: budgetSlice.reducer,
    transactionSlice: transactionSlice.reducer,
  },
});

export default store;
