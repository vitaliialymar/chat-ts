import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { actions, fetchDatas } from './channelsSlice';
import type { Message } from '../contexts/ServerClientContext'

  type Messages = {
    messages:  Message[],
  }

  const initialState: Messages = {
    messages: [],
  }

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, { payload }: PayloadAction<Message>) => {
      state.messages.push(payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDatas.fulfilled, (state, { payload }) => {
        state.messages = payload.messages;
      });
    builder.addCase(actions.removeChannel, (state, { payload }) => {
      const { id } = payload; 
      const restEntities = Object.values(state.messages).filter((e) => e.channelId !== id);
      state.messages = restEntities;
    });
  },
});

export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;