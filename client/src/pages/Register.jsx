import React, { useState } from "react";
import api from '../api/api.js'; // ensure this is your axios base instance
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { startLoading, loginSuccess, loginFailure } from '../store/authSlice.js';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authState = useSelector(state => state.auth) || {};
    const { loading, error } = authState;
    // Form state (including avatar as base64 string)
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        avatar: ''  // Will hold base64 string or URL
    });

    // Handle input change for text fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    // Handle avatar file input change, convert to base64 string
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

    // Form submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(startLoading());

        try {
           
            const response = await api.post('/auth/register', form);
            const token = response.data.token;

            // Save token in localStorage & update Redux state
            localStorage.setItem('jwt', token);
            dispatch(loginSuccess(token));

           
            navigate('/login');
        } catch (err) {
            const message = err.response?.data?.message || 'Signup failed';
            dispatch(loginFailure(message));
        }
    };

    // Google Sign Up Handler (stub - implement firebase or OAuth logic later)
    const handleGoogleSignUp = () => {
        alert('Google Sign Up not implemented yet!');
    };

    return (
        <div className="flex items-center justify-center min-h-screen overflow-hidden">
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
                            {loading ? 'Signing Up...' : 'Sign Up'}
                        </button>
                        <button
                            type="button"
                            onClick={handleGoogleSignUp}
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
