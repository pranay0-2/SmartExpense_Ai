import { createSlice } from "@reduxjs/toolkit";
const initialState = [];

const transactionSlice = createSlice({
  name: "TransactionSlice",
  initialState: initialState,
  reducers: {
    addTransaction: (state, action) => {
      state.push(action.payload.transaction);
      return state;
    },
  },
});

export const transactionAction = transactionSlice.actions;
export default transactionSlice;
