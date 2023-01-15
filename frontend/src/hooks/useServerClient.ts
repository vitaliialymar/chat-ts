import { useContext } from 'react';
import ServerClientContext from '../contexts/ServerClientContext';

const useServerClient = () => useContext(ServerClientContext);

export default useServerClient;
