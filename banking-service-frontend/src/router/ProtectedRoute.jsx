// ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../features/auth/store/useAuthStore";

const ProtectedRoute = () => {
  const { authUser } = useAuthStore();
  console.log("Auth_User_Info", authUser);
  //If user not present 
  if (!authUser) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
