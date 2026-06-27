import { useAuth } from "../../hooks/useAuth";

function Navbar() {
  const { handleLogout, loading, error } = useAuth();

  return (
    <div>
      {error && <span style={{ color: "red" }}>{error}</span>}
      <button onClick={handleLogout} disabled={loading}>
        {loading ? "Logging out..." : "Logout"}
      </button>
    </div>
  );
}

export default Navbar;