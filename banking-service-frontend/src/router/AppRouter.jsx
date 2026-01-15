import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "../features/auth/page/login-page";
import { useAuthStore } from "../features/auth/store/useAuthStore";
import HomePage from "../features/home/page/HomePage";
import MainLayout from "../components/layout/MainLayout";

const AppRouter = () => {
  const { authUser } = useAuthStore();
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route
            path="/home"
           // element={authUser ? <HomePage /> : <LoginPage />}
           element={<HomePage/>}
          />
        </Route>
        <Route>
          <Route path="/" element={<LoginPage />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
