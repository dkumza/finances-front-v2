import { createSlice } from '@reduxjs/toolkit';
import { createExpense, fetchExpenses, fetchUserExpenses } from '../actions/expensesActions';

export interface Transaction {
  _id: string;
  category: string;
  description: string;
  date: string;
  amount: number;
  createdAt: string;
}

export interface Expense {
  allExpenses: Transaction[];
  allIncomes: Transaction[];
  balance: null;
  totalExpense: null;
  totalIncome: null;
  transactions: Transaction[];
  savings: null;
}

export interface ExpenseState {
  expense: string;
  fetchUserExpenses: Expense;
  fetchedExpenses: Expense;
  expensesStatus: 'idle' | 'loading' | 'success' | 'failed';
  error: string | undefined;
}

export const initialState: ExpenseState = {
  expense: '',
  fetchUserExpenses: {
    allExpenses: [],
    allIncomes: [],
    balance: null,
    totalExpense: null,
    totalIncome: null,
    transactions: [
      {
        _id: '',
        category: '',
        description: '',
        date: '',
        amount: 0,
        createdAt: '',
      },
    ],
    savings: null,
  },

  fetchedExpenses: {
    allExpenses: [],
    allIncomes: [],
    balance: null,
    totalExpense: null,
    totalIncome: null,
    transactions: [
      {
        _id: '',
        category: '',
        description: '',
        date: '',
        amount: 0,
        createdAt: '',
      },
    ],
    savings: null,
  },
  expensesStatus: 'idle',
  error: undefined,
};

export const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    setUserExpenses: (state, action) => {
      state.fetchUserExpenses = action.payload;
    },
    setExpenses: (state, action) => {
      state.fetchedExpenses = action.payload;
    },
    setExpenseToDelete: (state, action) => {
      state.expense = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createExpense.pending, (state) => {
        state.expensesStatus = 'loading';
      })
      .addCase(createExpense.fulfilled, (state, { payload }) => {
        state.expensesStatus = 'success';
        state.expense = payload;
        state.error = undefined;
      })
      .addCase(createExpense.rejected, (state, action) => {
        state.expensesStatus = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchUserExpenses.pending, (state) => {
        state.expensesStatus = 'loading';
      })
      .addCase(fetchUserExpenses.fulfilled, (state, { payload }) => {
        state.expensesStatus = 'success';
        state.fetchUserExpenses = payload;
        state.error = undefined;
      })
      .addCase(fetchUserExpenses.rejected, (state, action) => {
        state.expensesStatus = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchExpenses.pending, (state) => {
        state.expensesStatus = 'loading';
      })
      .addCase(fetchExpenses.fulfilled, (state, { payload }) => {
        state.expensesStatus = 'success';
        state.fetchedExpenses = payload;
        state.error = undefined;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.expensesStatus = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setUserExpenses, setExpenses, setExpenseToDelete } = expensesSlice.actions;

export default expensesSlice.reducer;
