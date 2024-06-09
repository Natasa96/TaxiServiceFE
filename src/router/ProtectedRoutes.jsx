//import React from 'react';
import PropTypes from "prop-types";
import { Outlet, Navigate } from "react-router-dom";
import useAuthStore from "../store/auth";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return isAuthenticated ? (
    <Outlet element={children} />
  ) : (
    <Navigate to="/login" />
  );
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
