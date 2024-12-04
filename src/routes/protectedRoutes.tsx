import React from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isLoading } = useUserContext();

  if (isLoading) {
    return <div>Loading...</div>; // Replace with a spinner or loading UI
  }

  return user ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
