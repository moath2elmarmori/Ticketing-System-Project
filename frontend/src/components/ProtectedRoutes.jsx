import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthContext from "../context/auth-context";

function ProtectedRoutes() {
  const { isLoggedIn } = useContext(AuthContext);
  if (!isLoggedIn) {
    toast.error("You must be signed in first");
  }
  return isLoggedIn ? <Outlet /> : <Navigate to={"/login"} />;
}

export default ProtectedRoutes;
