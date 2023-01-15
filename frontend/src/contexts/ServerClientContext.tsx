import { createContext } from 'react';
// import { Modal } from '../slices/modalsSlice';

export type Channel = {
  id?: number,
  name?: string,
  removable?: boolean,
}

export type Response = {
  data: {
    name: string,
    removable: boolean,
    id: number,
  },
  status: string,
}

export type Message = {
  body: string,
  username: string,
  channelId: number,
  id?: number,
}

export interface IServerContext {
    newMessage: (message: Message, fn: (res: Response) => void) => void,
    addNewChannel: (channel: Channel, fn: (res: Response) => void) => void,
    renameChannel: (channel: Channel, fn: (res: Response) => void) => void,
    removeChannel: (id: Channel, fn: (res: Response) => void) => void,
  }

const ServerClientContext = createContext<IServerContext>({
  newMessage: () => {},
  addNewChannel: () => {},
  renameChannel: () => {},
  removeChannel: () => {},
});

export default ServerClientContext;
