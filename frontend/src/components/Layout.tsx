import React from 'react';
import { Outlet } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/useAuth';

const Layout: React.FC = () => {
  const auth = useAuth();
  const { i18n, t } = useTranslation();

    return (
    <div className="h-100">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
            <div className="container">
              <a className="navbar-brand" href="/">{t('layout')}</a>
              <div className="d-flex justify-content-end col-xs-3">
              {auth?.loggedIn && <Button onClick={() => auth.logOut()} type="submit" variant="primary">{t('logout')}</Button>}
              <Form.Select size="sm" aria-label="select language" onChange={(e) => i18n.changeLanguage(e.target.value)} className="ms-1">
                <option value="ru">RU</option>
                <option value="en">ENG</option>
              </Form.Select>
              </div>
            </div>
          </nav>
          <Outlet />
        </div>
      </div>
    </div>
    );
  }
  
  export default Layout;
