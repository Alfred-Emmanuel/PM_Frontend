import React from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { user } = useUserContext();
    // console.log(user);
//   const isAuthenticated = false;

  return user ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
