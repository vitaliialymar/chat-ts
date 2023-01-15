import { useContext } from 'react';
import authContext from '../contexts/AuthContext';

const useAuth = () => useContext(authContext);

export default useAuth;
