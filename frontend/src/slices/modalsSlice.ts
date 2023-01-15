/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Modal = {
  type: string,
  item: number,
}

const initialState: Modal = {
  type: '',
  item: 0,
};

const modalsSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    show: (state, { payload }: PayloadAction<Modal>) => {
      state.type = payload.type;
      state.item = payload.item;
    },
    hide: (state) => {
      state.item = 0;
      state.type = '';
    },
  },
});

export const { show, hide } = modalsSlice.actions;
export default modalsSlice.reducer;
