import React, { useState } from 'react';
import api from '../api/api.js'; // make sure this is your Axios instance!
import { useDispatch } from 'react-redux';
import { addPost, startLoading, fetchPostsFailure } from '../store/postSlice.js'; // adjust path as needed
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Form state
    const [form, setForm] = useState({
        title: '',
        content: '',
        tags: '',
        image: null,       // File object
        imagePreview: null // For showing preview
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Handle text changes (title, content, tags)
    const handleChange = e => {
        const { name, value } = e.target;
        setForm(f => ({ ...f, [name]: value }));
    };

    // Handle image file input
    const handleImageChange = e => {
        const file = e.target.files[0];
        if (file) {
            setForm((f) => ({ ...f, image: file }));
            const reader = new FileReader();
            reader.onload = ev => setForm(f => ({ ...f, imagePreview: ev.target.result }));
            reader.readAsDataURL(file);
        } else {
            setForm(f => ({ ...f, image: null, imagePreview: null }));
        }
    };

    // Submit handler: sends post to backend API using FormData
    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const data = new FormData();
        data.append('title', form.title);
        data.append('content', form.content);
        data.append('tags', form.tags);
        if (form.image) {
            data.append('image', form.image); // field name 'image' must match your backend!
        }

        try {
            // If your API requires Authorization: Bearer <token>:
            const token = localStorage.getItem('jwt');
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    // Do not set Content-Type, let Axios/Browser set it for FormData
                }
            };
            const response = await api.post('/posts', data, config);

            setLoading(false);
            dispatch(addPost(response.data)); // update Redux store
            navigate('/'); // redirect, could go to the post or dashboard

        } catch (err) {
            setLoading(false);
            const message = err.response?.data?.message || 'Failed to create post';
            setError(message);
            dispatch(fetchPostsFailure(message));
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="flex flex-col border border-gray-400 rounded-lg gap-5 p-6 w-full max-w-5xl bg-gray-700 shadow-lg">
                <h1 className="text-2xl text-purple-400 font-bold text-center">Create Post</h1>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col mb-4">
                        <label className="mb-1 text-white">Title</label>
                        <input
                            name="title"
                            required
                            type="text"
                            className="border border-gray-500 rounded px-3 py-2 bg-gray-600 text-white"
                            value={form.title}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="mb-1 text-white">Content</label>
                        <textarea
                            name="content"
                            required
                            rows="4"
                            className="border border-gray-500 rounded px-3 py-2 bg-gray-600 text-white"
                            value={form.content}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="mb-1 text-white">Tags (comma-separated)</label>
                        <input
                            name="tags"
                            type="text"
                            className="border border-gray-500 rounded px-3 py-2 bg-gray-600 text-white"
                            value={form.tags}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="mb-1 text-white">Image</label>
                        <input
                            name="image"
                            type="file"
                            accept="image/*"
                            className="border border-gray-500 rounded px-3 py-2 bg-gray-600 text-white"
                            onChange={handleImageChange}
                        />
                        {form.imagePreview &&
                            <img src={form.imagePreview} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded-lg" />}
                    </div>
                    {error && <div className="text-red-400 mb-2">{error}</div>}
                    <button
                        type="submit"
                        className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 rounded"
                        disabled={loading}
                    >{loading ? "Creating..." : "Create Post"}</button>
                </form>
            </div>
        </div>
    );
};

export default CreatePost;
