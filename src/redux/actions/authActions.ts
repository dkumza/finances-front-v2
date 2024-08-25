import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  MyRejectValue,
  handleAxiosError,
} from '../../helpers/handleAxiosError';

const AUTH_URL = 'http://127.0.0.1:3000';

export const tokenStatus = createAsyncThunk<
  string,
  string,
  { rejectValue: MyRejectValue }
>('auth/tokenStatus', async (token, thunkAPI) => {
  try {
    const response = await axios.get(`${AUTH_URL}/auth/`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    return handleAxiosError(error, thunkAPI);
  }
});
export const login = createAsyncThunk<
  string,
  object,
  { rejectValue: MyRejectValue }
>('auth/loginUser', async (loginData, thunkAPI) => {
  try {
    const response = await axios.post(`${AUTH_URL}/auth/`, loginData);
    return response.data.accessToken;
  } catch (error) {
    return handleAxiosError(error, thunkAPI);
  }
});

export const signUp = createAsyncThunk<
  string,
  object,
  { rejectValue: MyRejectValue }
>('auth/signUpUser', async (signUpData, thunkAPI) => {
  try {
    const response = await axios.post(`${AUTH_URL}/users`, signUpData);
    const { data } = response;
    return data;
  } catch (error) {
    return handleAxiosError(error, thunkAPI);
  }
});
