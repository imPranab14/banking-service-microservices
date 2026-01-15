import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <>
        <Outlet /> {/* Page content loads here */}
      </>
    </>
  );
};

export default MainLayout;
