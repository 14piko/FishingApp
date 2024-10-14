import { useContext } from 'react';
import { AuthContext } from '../components/AuthContext';

export default function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be AuthProvider-a');
  }
  return context;
}