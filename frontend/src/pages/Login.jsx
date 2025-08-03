import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import api from '../api/api';
import { useNavigate, Link } from 'react-router-dom';
import { startLoading, loginSuccess, loginFailure } from '../store/authSlice';
import { setUser } from '../store/userSlice';

import { auth, provider } from '../firebase';  // <-- Firebase imports
import { signInWithPopup } from 'firebase/auth';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authState = useSelector(state => state.auth) || {};
    const { loading, error } = authState;

    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(startLoading());
        try {
            const response = await api.post('/auth/login', form);
            localStorage.setItem('jwt', response.data.token);
            dispatch(loginSuccess(response.data.token));
            dispatch(setUser(response.data.user));
            navigate('/');
        } catch (error) {
            const message = error.response?.data?.message || 'Login failed';
            dispatch(loginFailure(message));
        }
    };

    // New: Google Login Handler
    const handleGoogleLogin = async () => {
        dispatch(startLoading());
        try {
            // Launch Google popup sign-in
            const result = await signInWithPopup(auth, provider);

            // Get the Firebase ID token from signed-in user
            const idToken = await result.user.getIdToken();

            // Send idToken to backend to validate and obtain JWT
            const response = await api.post('/auth/google-login', { idToken });

            // Get JWT token and user info from backend response
            const { token, user } = response.data;

            // Store token & update redux states
            localStorage.setItem('jwt', token);
            dispatch(loginSuccess(token));
            dispatch(setUser(user));

            navigate('/');
        } catch (err) {
            console.error('Google login failed:', err);
            const message = err.response?.data?.message || err.message || 'Google login failed';
            dispatch(loginFailure(message));
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen overflow-hidden ">
            <div className="rounded-lg flex flex-col w-full max-w-md p-6 bg-gray-700 text-white shadow-lg">
                <h1 className="text-3xl font-bold text-amber-300 text-center mb-6">Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col mb-4">
                        <label className="mb-1">Email:</label>
                        <input
                            type="email"
                            required
                            value={form.email}
                            onChange={handleChange}
                            name="email"
                            className="border border-gray-400 rounded px-3 py-2 bg-gray-600 text-white"
                        />
                    </div>

                    <div className="flex flex-col mb-4">
                        <label className="mb-1">Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            className="border border-gray-400 rounded px-3 py-2 bg-gray-600 text-white"
                        />
                    </div>

                    {error && <p className="text-red-400 mb-4">{error}</p>}

                    <div className="flex flex-col space-y-3">
                        <button
                            className="bg-amber-500 hover:bg-amber-600 text-white font-semibold p-2 rounded"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Logging In..." : "Login"}
                        </button>
                        <button
                            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded"
                            type="button"
                            onClick={handleGoogleLogin}
                            disabled={loading}
                        >
                            Login with Google
                        </button>
                    </div>
                </form>
                <div className="mt-4 text-center text-gray-300">
                    Don't have an account? <Link to="/register" className="text-amber-400 underline">Register</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
