import React, { useState, useRef, useEffect }from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import axios, { AxiosError } from 'axios';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { validator } from '../util/validator';
import routes from '../util/routes';
import useAuth from '../hooks/useAuth';

const loginImage = require('../assets/loginImage.jpg');

interface FormValues {
	username: string;
	password: string;
};

const Login: React.FC = () => {
  const { t } = useTranslation();
	const [authFailed, setAuthFailed] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const onSubmit = async (values: FormValues) => {
    setAuthFailed(false);
    setIsSubmit(true);
    try {
      const res = await axios.post(routes.loginPath(), values);
      localStorage.setItem('token', JSON.stringify(res.data));
      auth.logIn();
      const { from } = location.state || { from: { pathname: '/' } };
      navigate(from);
    } catch (err) {
      setAuthFailed(true);
      setIsSubmit(false);
      if (axios.isAxiosError(err) && (err as AxiosError).response?.status === 401) {
        inputRef.current?.select();
        return;
      }
      throw err;
    }
  };

	const {
    values, handleChange, handleSubmit,
  } = useFormik({
		initialValues: {
			username: '',
			password: '',
		},
		validationSchema: validator,
		onSubmit,
	});

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={loginImage} className="rounded-circle" alt="login" />
              </div>
              <Form onSubmit={handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                <fieldset disabled={isSubmit}>
                  <h1 className="text-center mb-4">{t('loginPage.login')}</h1>
                  <Form.Group className="form-floating mb-3">
                    <Form.Control
                      onChange={handleChange}
                      name="username"
                      autoComplete="username"
                      required
                      placeholder="Ваш ник"
                      id="username"
                      className="form-control"
                      value={values.username}
                      isInvalid={authFailed}
                      ref={inputRef}
                    />
                    <Form.Label htmlFor="username">{t('loginPage.name')}</Form.Label>
                  </Form.Group>
                  <Form.Group className="form-floating mb-4">
                    <Form.Control
                      onChange={handleChange}
                      name="password"
                      autoComplete="current-password"
                      required
                      placeholder="Пароль"
                      type="password"
                      id="password"
                      className="form-control"
                      value={values.password}
                      isInvalid={authFailed}
                    />
                    <Form.Label htmlFor="password">{t('loginPage.password')}</Form.Label>
                    {authFailed && <div className="invalid-tooltip">{t('errors.login')}</div>}
                  </Form.Group>
                  <Button variant="outline-primary" type="submit" className="w-100 mb-3 btn">{t('loginPage.login')}</Button>
                </fieldset>
              </Form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>{t('loginPage.footer')}</span>
                <Link to="/signup">{t('signupPage.signup')}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
