import React from 'react'

const CreatePost = () => {
    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="flex flex-col border border-gray-400 rounded-lg gap-5 p-6 w-full max-w-5xl bg-gray-700 shadow-lg">
                <h1 className="text-2xl text-purple-400 font-bold text-center">Create Post</h1>

                <div className="flex flex-col">
                    <label className="mb-1 text-white">Name</label>
                    <input
                        type="text"
                        className="border border-gray-500 rounded px-3 py-2 bg-gray-600 text-white"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="mb-1 text-white">Content</label>
                    <textarea
                        rows="4"
                        className="border border-gray-500 rounded px-3 py-2 bg-gray-600 text-white"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="mb-1 text-white">Tags (comma-separated)</label>
                    <input
                        type="text"
                        className="border border-gray-500 rounded px-3 py-2 bg-gray-600 text-white"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="mb-1 text-white">Image</label>
                    <input
                        type="file"
                        className="border border-gray-500 rounded px-3 py-2 bg-gray-600 text-white"
                    />
                </div>

                <button className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 rounded">
                    Create Post
                </button>
            </div>
        </div>
    )
}

export default CreatePost
