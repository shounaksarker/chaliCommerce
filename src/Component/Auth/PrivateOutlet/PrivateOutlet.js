import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateOutlet = () => {
  return localStorage.getItem("name") && localStorage.getItem("email") ? (
    <Outlet />
  ) : (
    <Navigate to="/auth" />
  );
};

export default PrivateOutlet;