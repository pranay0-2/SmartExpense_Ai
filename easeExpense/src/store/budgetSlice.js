import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  budget: 0,
  income: 0,
};

const budgetSlice = createSlice({
  name: "budgetSlice",
  initialState: initialState,
  reducers: {
    setbudget: (state, action) => {
      state.budget = action.payload.budget;
      return state;
    },
    setIncome: (state, action) => {
      state.income = action.payload.income;
      return state;
    },
  },
});

export const budgetSliceActions = budgetSlice.actions;

export default budgetSlice;
