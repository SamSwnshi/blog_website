import React from 'react'

const CreatePost = () => {
    return (
        <div className='flex flex-col border gap-5 p-4 justify-center min-h-96 '>
            <h1 className='text-2xl text-purple-500 font-bold'>Create Post</h1>
            <div className="flex flex-col mb-4">
                <label className="mb-1">Name</label>
                <input type="text" className="border border-gray-400 rounded px-3 py-2 bg-gray-600 text-white" />
            </div>

            <div className="flex flex-col mb-4">
                <label className="mb-1">Content</label>
                <input type="textarea" className="border border-gray-400 rounded px-3 py-2 bg-gray-600 text-white" />
            </div>

            <div className="flex flex-col mb-4">
                <label className="mb-1">Tags(comma-separeted)</label>
                <input type="text" className="border border-gray-400 rounded px-3 py-2 bg-gray-600 text-white" />
            </div>

            <div className="flex flex-col mb-6">
                <label className="mb-1">Image</label>
                <input type="file" className="border-1 border-gray-400 rounded-l-full px-3 py-2 bg-gray-600 text-white" />
            </div>

            <button>Create Post</button>
        </div>
    )
}

export default CreatePost
