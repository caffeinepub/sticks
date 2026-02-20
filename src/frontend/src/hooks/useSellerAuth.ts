import { useContext } from 'react';
import { SellerAuthContext } from '../contexts/SellerAuthContext';

export function useSellerAuth() {
  const context = useContext(SellerAuthContext);
  if (!context) {
    throw new Error('useSellerAuth must be used within SellerAuthProvider');
  }
  return context;
}
