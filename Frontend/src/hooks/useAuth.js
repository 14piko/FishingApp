import { useContext } from 'react';
import { AuthContext } from '../components/AuthContext';

export default function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const { isLoggedIn, authToken, userRole,  currentUser, login, logout, firstName, lastName } = context;

  return {
    isLoggedIn,
    authToken,
    userRole,
    currentUser,
    login,
    logout,
    userFirstName: firstName, 
    userLastName: lastName
  };
}