import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  MyRejectValue,
  handleAxiosError,
} from '../../helpers/handleAxiosError';
import { FormValues } from '../../components/inputs/Input';
import { Expense } from '../slices/expensesSlice';
import { RootState } from '../store';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '../../middlewares/loginMW';

export interface FetchExp {
  payload: {
    message: string;
    status: number;
  };
}

const EXP_URL = 'http://127.0.0.1:3000/expenses';

export const createExpense = createAsyncThunk<
  string,
  FormValues,
  { state: RootState; rejectValue: MyRejectValue }
>('expenses/createExpense', async (expensesData, thunkAPI) => {
  const token = thunkAPI.getState().login.token;
  const fixData = { ...expensesData };
  // "??" 0 Prevents errors when trying to access property 'amount' on null or undefined
  if (expensesData.category !== 'Salary' && expensesData.category !== 'Savings')
    fixData.amount = -Math.abs(expensesData.amount ?? 0);
  try {
    const response = await axios.post(EXP_URL, fixData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const { data } = response;
    return data._id;
  } catch (error) {
    console.error('error: ', error);
    return handleAxiosError(error, thunkAPI);
  }
});

export const fetchUserExpenses = createAsyncThunk<
  Expense,
  void,
  { state: RootState; rejectValue: MyRejectValue }
>('expenses/fetchUserExpenses', async (_, thunkAPI) => {
  const token = thunkAPI.getState().login.token;
  const decodedToken: DecodedToken = jwtDecode(token);
  const id = decodedToken.id;
  try {
    const response = await axios.get(`${EXP_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const { data } = response;
    return data;
  } catch (error) {
    console.error('error: ', error);
    return handleAxiosError(error, thunkAPI);
  }
});

export const fetchExpenses = createAsyncThunk<
  Expense,
  void,
  { state: RootState; rejectValue: MyRejectValue }
>('expenses/fetchExpenses', async (_, thunkAPI) => {
  const token = thunkAPI.getState().login.token;
  try {
    const response = await axios.get(EXP_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const { data } = response;
    return data;
  } catch (error) {
    // console.error('error: ', error);
    const axiosError = handleAxiosError(error, thunkAPI) as unknown as FetchExp;
    const { message, status } = axiosError.payload;
    return thunkAPI.rejectWithValue({ message, status });
  }
});

export const deleteExpense = createAsyncThunk<
  Expense,
  string,
  { state: RootState; rejectValue: MyRejectValue }
>('expenses/removeExpense', async (id, thunkAPI) => {
  const token = thunkAPI.getState().login.token;
  try {
    const response = await axios.delete(`${EXP_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const { data } = response;
    return data;
  } catch (error) {
    console.error('error: ', error);
    return handleAxiosError(error, thunkAPI);
  }
});
