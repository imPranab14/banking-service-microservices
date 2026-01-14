
import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main style={{ padding: "20px" }}>
        <Outlet /> {/* Page content loads here */}
      </main>
    </>
  );
};

export default MainLayout;
