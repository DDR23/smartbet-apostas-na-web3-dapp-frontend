import { LoadingOverlay } from "@mantine/core";
import { useAuth } from "../../contexts/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function PageAdmin() {
  const { isOwner, isLoading, isInitializing, walletAddress, connectWallet } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isInitializing && !isLoading && !walletAddress) {
      connectWallet().catch(() => {
        navigate('/');
      });
    }
  }, [isInitializing, isLoading, walletAddress, connectWallet, navigate]);

  if (isInitializing || isLoading) {
    return <LoadingOverlay visible={true} />;
  }

  if (!isOwner && !isLoading) {
    return <Navigate to='/' replace />;
  }

  return (
    <div>
      <h1>{isOwner ? 'Owner' : 'Not Owner'}</h1>
    </div>
  );
}
