// ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../features/auth/store/useAuthStore";

const ProtectedRoute = () => {
  const { authUser } = useAuthStore();
  console.log("auth",authUser);

  return authUser ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
