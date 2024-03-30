import { createSlice } from '@reduxjs/toolkit';

const ModalSlice = createSlice({
  name: 'ModalSlice',
  initialState: {
    isOpen: false,
  },
  reducers: {
    onClose: (state, { payload }) => {
      state.isOpen = false;
},
    onOpen: (state, { payload }) => {
      state.isOpen = true;
    },
  },
});

export const { onClose, onOpen } = ModalSlice.actions;
export default ModalSlice.reducer;
