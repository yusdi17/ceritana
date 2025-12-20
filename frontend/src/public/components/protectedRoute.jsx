import { Navigate, Outlet, useLocation } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

export default function ProtectedRoute() {

  const token = secureLocalStorage.getItem("token");
  const location = useLocation();

  if (!token) {
    return <Navigate
      to="/" 
      replace
      state={{ from: location, showLogin: true }} />
  }

  return <Outlet />
}