/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo } from 'react';
import { io, Socket, } from 'socket.io-client';
import filter from 'leo-profanity';
import { useAppDispatch } from '../hooks/hook';
import ServerClientContext from '../contexts/ServerClientContext';
import { addMessage } from '../slices/messageSlice';
import { actions as channelsActions } from '../slices/channelsSlice';
import type { Channel, Response, Message } from '../contexts/ServerClientContext';

const ServerProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const socket: Socket = io();

  useEffect(() => {
    socket.on('newMessage', (message) => {
      dispatch(addMessage(message));
    });
    socket.on('newChannel', (channel) => {
      dispatch(channelsActions.addChannel(channel));
    });
    socket.on('renameChannel', (channel) => {
      dispatch(channelsActions.updateChannel(channel));
    });
    socket.on('removeChannel', (id) => {
      dispatch(channelsActions.removeChannel(id));
    });
  }, [dispatch, socket]);

  const newMessage = ({ body, channelId, username }: Message, responseHandler: (res: Response) => void) => socket
    .emit('newMessage', { body: filter.clean(body), channelId, username }, (res: Response) => {
      responseHandler(res);
    });

  const addNewChannel = (channel: Channel, responseHandler: (res: Response) => void) => socket.emit('newChannel', channel, (res: Response) => {
    responseHandler(res);
  });

  const renameChannel = (channel: Channel, responseHandler: (res: Response) => void) => socket.emit('renameChannel', channel, (res: Response) => {
    responseHandler(res);
  });

  const removeChannel = (id: Channel, responseHandler: (res: Response) => void) => socket.emit('removeChannel', id, (res: Response) => {
    responseHandler(res);
  });

  const value = useMemo(() => ({addNewChannel, newMessage, removeChannel, renameChannel}), []);

  return (
    <ServerClientContext.Provider value={value}>
      {children}
    </ServerClientContext.Provider>
  );
};

export default ServerProvider;
