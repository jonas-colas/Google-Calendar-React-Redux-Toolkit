import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showEventModal: false,
};

const modalSlice = createSlice({
  name : 'modal',
  initialState,
  reducers: {
    showModal: (state) => {
      state.showEventModal = !state.showEventModal;
    }
  }
});

export const { showModal } = modalSlice.actions;

export default modalSlice.reducer;