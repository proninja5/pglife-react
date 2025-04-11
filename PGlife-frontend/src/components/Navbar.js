import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Navbar.css'; 

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar-custom">
      <div className="navbar-left">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/properties" className="nav-link">Properties</Link>
        {user && <Link to="/add-property" className="nav-link">Add PG</Link>}
      </div>
      
      <div className="navbar-right">
        {!user ? (
          <>
            <Link to="/signup" className="nav-link">Signup</Link>
            <Link to="/login" className="nav-link">Login</Link>
          </>
        ) : (
          <>
            <span className="nav-user">👋 Hi, {user.name}</span>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
