import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "./NavBar.css";

function NavBar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <div>
        {!isAuthenticated && <Link to="/login">Login</Link>}
        {!isAuthenticated && <Link to="/signup">Signup</Link>}
        {isAuthenticated && <Link to="/protected">Protected</Link>}
        {isAuthenticated && <button onClick={handleLogout}>Logout</button>}
      </div>
    </nav>
  );
}

export default NavBar;
