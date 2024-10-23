import { createContext, useEffect, useState } from 'react';
import { logInService } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';
import { RoutesNames } from '../constants';
import useError from '../hooks/useError';
import useLoading from '../hooks/useLoading';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authToken, setAuthToken] = useState('');
  const [userRole, setUserRole] = useState(''); 
  const { showLoading, hideLoading } = useLoading();
  const { showError } = useError();
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserFirstName, setCurrentUserFirstName] = useState(''); 
  const [currentUserLastName, setCurrentUserLastName] = useState(''); 
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem('Bearer');

    if (token) {
      setAuthToken(token);
      setIsLoggedIn(true);
      const decodedToken = jwtDecode(token);
      const role = decodedToken.role;
      const userFirstName = decodedToken.given_name;
      const userLastName = decodedToken.nameid;
      setCurrentUserFirstName(userFirstName);
      setCurrentUserLastName(userLastName);
      setUserRole(role);
      setCurrentUser(decodedToken);
    } else {
      navigate(RoutesNames.HOME);
    }
  }, []);

  async function login(userData) {
    showLoading();
    const response = await logInService(userData);
    hideLoading();

    if (!response.error) {
      const token = response.message; 
      localStorage.setItem('Bearer', token);
      setAuthToken(token);
      setIsLoggedIn(true);
      const decodedToken = jwtDecode(token);
      const role = decodedToken.role;
      setUserRole(role);
      const userFirstName = decodedToken.given_name;
      const userLastName = decodedToken.nameid;
      setCurrentUserFirstName(userFirstName);
      setCurrentUserLastName(userLastName);
      setCurrentUser(decodedToken);

      navigate(RoutesNames.HOME);
    } else {
      showError(response.message);
      localStorage.setItem('Bearer', '');
      setAuthToken('');
      setIsLoggedIn(false);
      setUserRole('');
      setCurrentUser(null);
    }
  }

  function logout() {
    localStorage.setItem('Bearer', '');
    setAuthToken('');
    setIsLoggedIn(false);
    setUserRole('');
    setCurrentUser(null);
    navigate(RoutesNames.HOME);
  }

  function getCurrentUser() {
    return currentUser;
  }

  const value = {
    isLoggedIn,
    authToken,
    userRole,
    currentUser,
    login,
    logout,
    firstName: currentUserFirstName ? currentUserFirstName : '', 
    lastName: currentUserLastName ? currentUserLastName : '',
  };


  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}