import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  isOpen: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    modalState: (state) => {
      state.isOpen = !state.isOpen;
    },
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { modalState, openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
