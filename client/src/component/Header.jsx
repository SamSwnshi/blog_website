import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice.js"; // adjust path accordingly

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get login token (change 'auth' to your slice name if different)
  const token = useSelector((state) => state.auth?.token);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("jwt"); // clean localStorage too
    navigate("/login");
  };

  return (
    <div className="flex justify-between p-5 text-center items-center bg-gray-700 text-white">
      <h1 className="text-2xl font-bold">
        <Link to="/">Blog App</Link>
      </h1>

      <div className="flex gap-4">
        <Link to="/">Home</Link>

        {token ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button
              onClick={handleLogout}
              className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">SignUp</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
