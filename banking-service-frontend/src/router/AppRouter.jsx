import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "../features/auth/page/login-page";


const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/home"
          element={
            <>
              <h1>this is home page</h1>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
