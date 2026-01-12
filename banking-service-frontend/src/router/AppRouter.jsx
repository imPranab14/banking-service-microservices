import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "../features/auth/page/login-page";
import { useAuthStore } from "../features/auth/store/useAuthStore";

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
              <>
                <h1>this is home page</h1>
              </>
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
