import { LoadingOverlay } from "@mantine/core";
import { useAuth } from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function PageAdmin() {
  const { isOwner, isLoading, isInitializing } = useAuth();

  if (isInitializing || isLoading) {
    return <LoadingOverlay visible={true} />;
  }

  if (!isOwner) {
    return <Navigate to='/' replace />;
  }

  return (
    <div>
      <h1>PageAdmin</h1>
    </div>
  );
}
