import { useAuthStore } from "../../features/auth/store/useAuthStore";

const Navbar = () => {
  const { fetchLogout } = useAuthStore();
  return (
    <nav
      className="flex items-center px-6 py-4"
      style={{
        background: "#222",
        color: "#fff",
        justifyContent: "space-between",
      }}
    >
      <h3>My App</h3>
      <button onClick={() => fetchLogout()}>Logout</button>
    </nav>
  );
};

export default Navbar;
