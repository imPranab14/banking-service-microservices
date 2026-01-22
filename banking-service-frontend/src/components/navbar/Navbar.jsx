import { logoutApi } from "../../features/auth/api/auth.api";

//const handelLogout = logoutApi();
const Navbar = () => {
  return (
    <nav className="flex items-center px-6 py-4" style={{ background: "#222", color: "#fff",justifyContent:"space-between" }}>
      <h3>My App</h3>
      <button onClick={()=> logoutApi()}>Logout</button>
    </nav>
  );
};

export default Navbar;
