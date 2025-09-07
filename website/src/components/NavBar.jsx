import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser)); // assuming you saved { username: "Mary" }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login"); // go to login page
  };

  return (
    <nav className="flex justify-between p-4 bg-gray-800 text-white">
      {user ? (
        <button
          onClick={() => navigate("/shop")}
          className="font-bold hover:underline"
        >
          Welcome {user.username}
        </button>
      ) : (
        <Link to="/shop" className="font-bold">My Shop</Link>
      )}

      <ul className="flex gap-4 items-center">
        <li><Link to="/cart">Cart</Link></li>
        <li><Link to="/favorites">Favorites</Link></li>

        {user ? (
          <li>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </li>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;