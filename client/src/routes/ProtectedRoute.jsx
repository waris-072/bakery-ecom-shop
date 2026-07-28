import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
  import Loader from "../components/loader/Loader";
import { Children } from "react";

function ProtectedRoute({children}) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Loader message="Checking your account..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;