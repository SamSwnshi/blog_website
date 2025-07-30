import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../api/api.js"; // your axios base instance
import { logout } from "../store/authSlice.js"; // adjust path as needed

const Profile = () => {
  const token = useSelector((state) => state.auth?.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      // Not logged in, navigate to login
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get("/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(response.data);
      } catch (err) {
        const errMsg = err.response?.data?.message || "Failed to load profile";
        setError(errMsg);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("jwt");
    navigate("/login");
  };

  if (!token) return null; // or a redirect component

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-800 text-white rounded mt-8 shadow-lg">
      {loading && <p>Loading profile...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {profile && (
        <div className="flex flex-col items-center">
          <img
            src={
              profile.avatar ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="Avatar"
            className="w-28 h-28 rounded-full mb-4 object-cover border-4 border-purple-600"
          />
          <h2 className="text-2xl font-semibold mb-2">{profile.name}</h2>
          <p className="text-gray-300 mb-2">{profile.email}</p>
          {/* Add more user info as desired */}
          <button
            onClick={handleLogout}
            className="mt-4 bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
