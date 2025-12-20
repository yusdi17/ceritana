import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage'

export default function RequireAdmin() {

  const token = secureLocalStorage.getItem("token");
  const user = secureLocalStorage.getItem("user");
  const location = useLocation();

  if (!token) {
    return <Navigate
      to="/" 
      replace
      state={{ from: location, showLogin: true }} />
  }

  if (!token || user.role !== "admin") {
    return <Navigate
      to="/" 
      replace />
  }

  return <Outlet />
}
