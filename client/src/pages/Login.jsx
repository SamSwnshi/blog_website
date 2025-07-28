import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import api from '../api/api'
import { useNavigate, Link } from 'react-router-dom';
import { startLoading, loginSuccess, loginFailure } from '../store/authSlice'

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector(state => state.auth);
    console.log("Redux auth slice:", auth);
    const { loading, error } = auth || {};

    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(startLoading())
        try {
            const response = await api.post('/auth/login', form);
            localStorage.setItem('jwt', response.data.token)
            dispatch(loginSuccess(response.data.token))
            console.log(response)
            navigate('/')
        } catch (error) {
            const message = error.response?.data?.message || 'Login failed';
            dispatch(loginFailure(message));
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen overflow-hidden ">
            <div className="rounded-lg flex flex-col w-full max-w-md p-6 bg-gray-700 text-white shadow-lg">
                <h1 className="text-3xl font-bold text-amber-300 text-center mb-6">
                    Login
                </h1>
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

                    <div className="flex flex-col space-y-3">
                        <button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 rounded" type="submit" disabled={loading}>
                            {loading ? "Loggin In" : Login}
                        </button>
                        <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded">
                            Login with Google
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
