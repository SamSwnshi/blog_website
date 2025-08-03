import React, { useState } from "react";
import api from '../api/api.js'; // your axios base instance
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { startLoading, loginSuccess, loginFailure } from '../store/authSlice.js';
import { setUser } from '../store/userSlice.js';

import { auth, provider } from '../firebase.js'; // Firebase config
import { signInWithPopup } from 'firebase/auth';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector(state => state.auth) || {};
  const { loading, error } = authState;

  // Form state including avatar as base64 string
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    avatar: ''  // Will hold base64 string or empty
  });

  // Handle input changes for text fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Handle avatar upload and convert to base64 string
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setForm(prev => ({ ...prev, avatar: '' }));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setForm(prev => ({ ...prev, avatar: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  // Handle form submission for normal signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(startLoading());

    try {
      const response = await api.post('/auth/register', form);
      const token = response.data.token;
      const user = response.data.user;

      // Save token & update redux state
      localStorage.setItem('jwt', token);
      dispatch(loginSuccess(token));
      dispatch(setUser(user));

      navigate('/');
    } catch (err) {
      const message = err.response?.data?.message || 'Signup failed';
      dispatch(loginFailure(message));
    }
  };

  // Handle Google Sign Up using Firebase auth
  const handleGoogleSignUp = async () => {
    dispatch(startLoading());

    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      const response = await api.post('/auth/google-login', { idToken });
      const { token, user } = response.data;

      localStorage.setItem('jwt', token);
      dispatch(loginSuccess(token));
      dispatch(setUser(user));

      navigate('/');
    } catch (err) {
      console.error('Google sign up failed', err);
      const message = err.response?.data?.message || err.message || 'Google sign up failed';
      dispatch(loginFailure(message));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen overflow-hidden bg-gray-900">
      <div className="rounded-lg flex flex-col w-full max-w-md p-6 bg-gray-700 text-white shadow-lg">
        <h1 className="text-3xl font-bold text-amber-300 text-center mb-6">Sign Up</h1>

        <form onSubmit={handleSubmit}>

          <div className="flex flex-col mb-4">
            <label htmlFor="name" className="mb-1">Name:</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              className="border border-gray-400 rounded px-3 py-2 bg-gray-600 text-white"
            />
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="email" className="mb-1">Email:</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              className="border border-gray-400 rounded px-3 py-2 bg-gray-600 text-white"
            />
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="password" className="mb-1">Password:</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={form.password}
              onChange={handleChange}
              className="border border-gray-400 rounded px-3 py-2 bg-gray-600 text-white"
            />
          </div>

          <div className="flex flex-col mb-6">
            <label htmlFor="avatar" className="mb-1">Avatar (optional):</label>
            <input
              id="avatar"
              name="avatar"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="border border-gray-400 rounded px-3 py-2 bg-gray-600 text-white"
            />
            {form.avatar && (
              <img src={form.avatar} alt="Avatar preview" className="mt-2 rounded-full w-20 h-20 object-cover" />
            )}
          </div>

          {error && <p className="text-red-400 mb-4">{error}</p>}

          <div className="flex flex-col space-y-3">
            <button
              type="submit"
              disabled={loading}
              className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 rounded disabled:opacity-50"
            >
              {loading ? 'Signing Up...' : 'Signup'}
            </button>
            <button
              type="button"
              onClick={handleGoogleSignUp}
              disabled={loading}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded"
            >
              Sign Up with Google
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};


export default Register;
