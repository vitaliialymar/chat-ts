// /* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../util/routes';

type Data = {
  channels: [],
  currentChannelId: number,
  messages: [],
}

type Channel = {
  id: number,
  name: string,
  removable: boolean,
}

type Channels = {
  channels: Channel[],
  currentChannelId: number,
}

const getAuthHeader = () => {
    const userId = JSON.parse(localStorage.getItem('token')|| '{}');
    
    if (userId && userId.token) {
      return { headers: { Authorization: `Bearer ${userId.token}` } };
    }
    
    return {};
  };

export const fetchDatas = createAsyncThunk<Data>(
  'data/fetchData',
  async () => {
    const { data } = await axios.get(routes.dataPath(), getAuthHeader()); 
    return data as Data;
  },
);

const defaultChannelId = 1;

const initialState: Channels = {
  channels: [],
  currentChannelId: defaultChannelId,
}

const channelsSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    changeChannel: (state, { payload }: PayloadAction<number>) => {
      state.currentChannelId = payload;
    },
    addChannel: (state, { payload }: PayloadAction<Channel>) => {
      state.channels.push(payload);
    },
    updateChannel: (state, { payload }: PayloadAction<Channel>) => {
      console.log(payload);
      const {id, name} = payload;
      const newS = state.channels.map((ch) => ch.id === id ? { ...ch, name } : ch);
      state.channels = newS;
    },
    removeChannel: (state, { payload }: PayloadAction<Channel>) => {
      if (state.currentChannelId === payload.id) {
        state.currentChannelId = defaultChannelId;
      }
      const restEntities = state.channels.filter((ch) => ch.id !== payload.id);
      state.channels = restEntities;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDatas.fulfilled, (state, { payload }) => {
        state.channels = payload.channels;
        state.currentChannelId = payload.currentChannelId;
      })
  },
});

export const { actions } = channelsSlice;
export default channelsSlice.reducer;
