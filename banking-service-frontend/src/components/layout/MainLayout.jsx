import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Navbar_NEW from "../navbar/Navbar_NEW";


const MainLayout = () => {
  return (
    <>
    <Navbar_NEW/>
      <Navbar />
      <>
        <Outlet /> {/* Page content loads here */}
      </>
    </>
  );
};

export default MainLayout;
