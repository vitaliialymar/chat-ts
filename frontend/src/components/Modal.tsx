import React from 'react';
import { useAppSelector } from '../hooks/hook';
import {getModal} from './modals/index';

const Modal: React.FC = () => {
  const modals = useAppSelector((state) => state.modals);
  const CurrentModal = getModal(modals.type);
  
  if (!CurrentModal) {
    return null;
  }
  return (
    <CurrentModal />
  );
}

export default Modal;
