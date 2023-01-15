import { Outlet } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/useAuth';

const Layout: React.FC = () => {
  const auth = useAuth();
  const { t } = useTranslation();

    return (
    <div className="h-100">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
            <div className="container">
              <a className="navbar-brand" href="/">{t('layout')}</a>
              {auth?.loggedIn && <Button onClick={() => auth.logOut()}type="submit" className="btn-primary">{t('logout')}</Button>}
            </div>
          </nav>
          <Outlet />
        </div>
      </div>
    </div>
    );
  }
  
  export default Layout;
