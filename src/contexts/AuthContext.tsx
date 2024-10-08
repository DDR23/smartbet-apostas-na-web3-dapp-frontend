import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import ProviderWallet from '../services/ProviderWallet';
import ProviderNotification from '../utils/ProviderNotification';
import GetOwner from '../services/GetOwner';

interface AuthContextType {
  walletAddress: string;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  isLoading: boolean;
  isOwner: boolean;
  isInitializing: boolean; // Novo estado
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [isOwner, setIsOwner] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const savedWalletAddress = localStorage.getItem('walletAddress');
    if (savedWalletAddress) {
      verifyConnection().finally(() => setIsInitializing(false));
    } else {
      setIsInitializing(false);
    }
  }, []);

  useEffect(() => {
    if ((window as any).ethereum) {
      (window as any).ethereum.on('accountsChanged', handleAccountsChanged);
    }
    return () => {
      if ((window as any).ethereum) {
        (window as any).ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, []);

  const verifyConnection = async () => {
    const web3 = ProviderWallet();
    if (web3) {
      try {
        const accounts = await web3.eth.getAccounts();
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          localStorage.setItem('walletAddress', accounts[0]);
          const owner = await GetOwner();
          if (owner && owner.toLowerCase() === accounts[0].toLowerCase()) {
            setIsOwner(true);
          } else {
            setIsOwner(false);
          }
        } else {
          disconnectWallet();
        }
      } catch (error) {
        console.error('Error verifying connection:', error);
        disconnectWallet();
      }
    }
  };

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      disconnectWallet();
    } else if (accounts[0] !== walletAddress) {
      setWalletAddress(accounts[0]);
      localStorage.setItem('walletAddress', accounts[0]);
      verifyOwnerStatus(accounts[0]);
    }
  };

  const verifyOwnerStatus = async (account: string) => {
    const owner = await GetOwner();
    if (owner && owner.toLowerCase() === account.toLowerCase()) {
      setIsOwner(true);
    } else {
      setIsOwner(false);
    }
  };

  const connectWallet = async () => {
    const web3 = ProviderWallet();
    if (web3) {
      try {
        setIsLoading(true);
        const accounts = await web3.eth.requestAccounts();
        setWalletAddress(accounts[0]);
        localStorage.setItem('walletAddress', accounts[0]);
        await verifyOwnerStatus(accounts[0]);
        ProviderNotification({ title: 'Success', message: 'Connected successfully' });
      } catch (error) {
        ProviderNotification({ title: 'Error', message: 'Unable to connect' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const disconnectWallet = () => {
    setWalletAddress('');
    setIsOwner(false);
    localStorage.removeItem('walletAddress');
    ProviderNotification({ title: 'Success', message: 'Wallet disconnected' });
  };

  return (
    <AuthContext.Provider value={{ walletAddress, connectWallet, disconnectWallet, isLoading, isOwner, isInitializing }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
