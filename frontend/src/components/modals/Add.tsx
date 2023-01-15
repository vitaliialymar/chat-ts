import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hook'
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import {
  Modal, FormGroup, FormControl, Button, Form,
} from 'react-bootstrap';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import useServerClient from '../../hooks/useServerClient';
import { hide } from '../../slices/modalsSlice';
import { actions } from '../../slices/channelsSlice';
import type { Response } from '../../contexts/ServerClientContext';

const Add = () => {
  const { t } = useTranslation();

  const [isSubmit, setIsSubmit] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null!);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const { addNewChannel } = useServerClient();

  const dispatch = useAppDispatch();

  const responseHandler = (res: Response) => {
    if (res.status === 'ok') {
      dispatch(actions.changeChannel(res.data.id));
      dispatch(hide());
      toast.success(t('toast.add'));
    } else {
      toast.warn(t('errors.networkError'));
      throw new Error('Network Error!');
    }
  };


interface FormValues {
	name: string;
};

  const onSubmit = (values: FormValues) => {
    setIsSubmit(true);
    addNewChannel(values, responseHandler);
  };

    const { channels } = useAppSelector((state) => state.channels);
    const channelsNames = channels.map((ch) => ch.name);

  const {
    values, errors, touched, handleChange, handleSubmit,
  } = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: yup.object().shape({
      name: yup.string().required('errors.required').min(3, 'errors.name').max(20, 'errors.name')
        .notOneOf(channelsNames, 'errors.unique'),
    }),
    onSubmit,
  });

  return (
    <Modal centered show>
      <Modal.Header closeButton onHide={() => dispatch(hide())}>
        <Modal.Title>{t('modals.add')}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <fieldset disabled={isSubmit}>
          <Modal.Body>
            <FormGroup>
              <FormControl
                required
                ref={inputRef}
                onChange={handleChange}
                value={values.name}
                data-testid="input-body"
                name="name"
                id="name"
                className={errors.name && touched.name ? 'is-invalid form-control' : 'form-control'}
              />
              <Form.Label htmlFor="name" className="visually-hidden">{t('modals.name')}</Form.Label>
              <Form.Control.Feedback type="invalid">
                {errors.name ? t(errors.name) : null}
              </Form.Control.Feedback>
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => dispatch(hide())}>
              {t('modals.cancel')}
            </Button>
            <Button type="submit" variant="primary">
              {t('modals.send')}
            </Button>
          </Modal.Footer>
        </fieldset>
      </Form>
    </Modal>
  );
};

export default Add;
