import { createContext } from 'react';

export interface IAuthContext {
    setLoggedIn: (b: boolean) => void,
    logIn: () => void,
    logOut: () => void,
    getUsername: () => string,
    // getAuthHeader: () => {},
    loggedIn: boolean,
  }

const AuthContext = createContext<IAuthContext>({
    setLoggedIn: () => {},
    logIn: () => {},
    logOut: () => {},
    getUsername: () => { return ''},
    // getAuthHeader: () => { return {}},
    loggedIn: !!localStorage.getItem('token'),
});

export default AuthContext;
