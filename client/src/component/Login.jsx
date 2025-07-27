import React from "react";

const Login = () => {
    return (
        <div className="flex items-center justify-center min-h-screen overflow-hidden ">
            <div className="rounded-lg flex flex-col w-full max-w-md p-6 bg-gray-700 text-white shadow-lg">
                <h1 className="text-3xl font-bold text-amber-300 text-center mb-6">Login</h1>

                

                <div className="flex flex-col mb-4">
                    <label className="mb-1">Email:</label>
                    <input type="email" className="border border-gray-400 rounded px-3 py-2 bg-gray-600 text-white" />
                </div>

                <div className="flex flex-col mb-4">
                    <label className="mb-1">Password:</label>
                    <input type="password" className="border border-gray-400 rounded px-3 py-2 bg-gray-600 text-white" />
                </div>

                

                <div className="flex flex-col space-y-3">
                    <button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 rounded">Login</button>
                    <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded">Login with Google</button>
                </div>
            </div>
        </div>
    );
};

export default Login;
