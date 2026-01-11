import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../features/auth/Login";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
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
