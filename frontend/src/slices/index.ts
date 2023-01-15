import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice';
import messagesReduser from './messageSlice';
import modalsReduser from './modalsSlice';

const store = configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReduser,
    modals: modalsReduser,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
