import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from './createSlice';
import { login, signUp, tokenStatus } from '../actions/authActions';

export interface AuthState {
  token: string;
  tokenStatus: string;
  email: string | null;
  loading: boolean;
  error: string | null;
}

const localStorageToken =
  localStorage.getItem('token') || sessionStorage.getItem('token');
const localStorageEmail =
  localStorage.getItem('email') || sessionStorage.getItem('email');

export const initialState: AuthState = {
  token: localStorageToken || '',
  tokenStatus: '',
  email: localStorageEmail || null,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = '';
      state.tokenStatus = '';
      state.email = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Sign up
      .addCase(signUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUp.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signUp.rejected, (state) => {
        state.loading = false;
      })
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.token = payload;
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
      })
      // Token status
      .addCase(
        tokenStatus.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.tokenStatus = action.payload;
          state.error = null;
        }
      )
      .addCase(
        tokenStatus.rejected,
        (state, action: PayloadAction<unknown>) => {
          state.tokenStatus = '';
          state.error = (action.payload as { message: string }).message;
        }
      );
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
