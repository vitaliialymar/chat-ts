import React from 'react';
import {
    BrowserRouter, Route, Routes, Navigate, useLocation,
  } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import useAuth from '../hooks/useAuth';
import AuthProvider from '../providers/AuthProvider';
import ServerProvider from '../providers/ServerProvider';
import Layout from './Layout';
import ErrorPage from './ErrorPage';
import Login from './Login';
import Homepage from './Homepage';
import Signup from './Singup';


const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();
  
  return (
    auth?.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const App: React.FC = () => {
  return (
    <ServerProvider>
    <AuthProvider>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={(
                <PrivateRoute>
                  <Homepage />
                </PrivateRoute>
              )}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </ServerProvider>
  );
}

export default App;
