import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "../features/auth/page/login-page";
import { useAuthStore } from "../features/auth/store/useAuthStore";
import HomePage from "../features/home/page/HomePage";

const AppRouter = () => {
  const { authUser } = useAuthStore();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/home"
          element={
            authUser ? (
              <HomePage/>
            ) : (
              <LoginPage />
            )
          }
        />
        <Route path="*" element={<h1>Not Found</h1>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
