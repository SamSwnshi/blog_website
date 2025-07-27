import React from "react";

const Register = () => {
    return (
        <div className="flex items-center justify-center min-h-screen overflow-hidden bg-gray-800">
            <div className="rounded-lg flex flex-col w-full max-w-md p-6 bg-gray-700 text-white shadow-lg">
                <h1 className="text-3xl font-bold text-amber-300 text-center mb-6">Sign Up</h1>

                <div className="flex flex-col mb-4">
                    <label className="mb-1">Name:</label>
                    <input type="text" className="border border-gray-400 rounded px-3 py-2 bg-gray-600 text-white" />
                </div>

                <div className="flex flex-col mb-4">
                    <label className="mb-1">Email:</label>
                    <input type="email" className="border border-gray-400 rounded px-3 py-2 bg-gray-600 text-white" />
                </div>

                <div className="flex flex-col mb-4">
                    <label className="mb-1">Password:</label>
                    <input type="password" className="border border-gray-400 rounded px-3 py-2 bg-gray-600 text-white" />
                </div>

                <div className="flex flex-col mb-6">
                    <label className="mb-1">Avatar (optional):</label>
                    <input type="file" className="border border-gray-400 rounded px-3 py-2 bg-gray-600 text-white" />
                </div>

                <div className="flex flex-col space-y-3">
                    <button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 rounded">Sign Up</button>
                    <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded">Sign Up with Google</button>
                </div>
            </div>
        </div>
    );
};

export default Register;
