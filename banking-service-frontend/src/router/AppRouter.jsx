import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "../features/auth/page/login-page";

import HomePage from "../features/home/page/HomePage";
import MainLayout from "../components/layout/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import SlowResponsePage from "../features/home/page/SlowResponsePage";

const AppRouter = () => {
 
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute/>}>
          <Route element={<MainLayout />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/slow-page" element={<SlowResponsePage />} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
