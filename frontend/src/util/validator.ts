import * as yup from 'yup';

export const validator = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

export const signupValidator = yup.object().shape({
  username: yup.string().required('errors.required').min(3, 'errors.name').max(20, 'errors.name'),
  password: yup.string().required('errors.required').min(6, 'errors.password'),
  confirmPassword: yup.string().required('errors.required').oneOf([yup.ref('password')], 'errors.confirmPassword'),
});

