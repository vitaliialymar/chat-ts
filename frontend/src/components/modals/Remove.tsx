import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../hooks/hook'
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { hide } from '../../slices/modalsSlice';
import useServerClient from '../../hooks/useServerClient';
import type { Response } from '../../contexts/ServerClientContext';

const Remove = () => {
  const { t } = useTranslation();

  const [isSubmit, setIsSubmit] = useState(false);

  const dispatch = useAppDispatch();
  const { removeChannel } = useServerClient();
  const { item } = useAppSelector((state) => state.modals);

  const responseHandler = (res: Response) => {
    if (res.status === 'ok') {
      dispatch(hide());
      toast.success(t('toast.remove'));
    } else {
      toast.warn(t('errors.networkError'));
      throw new Error('Network Error!');
    }
  };

  const removeHandler = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmit(true);
    
    removeChannel({id: item}, responseHandler);
  };

  return (
    <Modal centered show>
      <Modal.Header closeButton onHide={() => dispatch(hide())}>
        <Modal.Title>{t('modals.remove')}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={removeHandler}>
        <Modal.Body>{t('modals.sure')}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => dispatch(hide())}>
            {t('modals.cancel')}
          </Button>
          <Button disabled={isSubmit} type="submit" variant="danger">
            {t('modals.delete')}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default Remove;
