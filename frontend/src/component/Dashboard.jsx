import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from '../store/postActions';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { posts, loading, error } = useSelector(state => state.posts);
  const token = useSelector(state => state.auth.token);
  const user = useSelector(state => state.user.user);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  // Filter posts by current user - handle both string and object author fields
  const myPosts = posts?.filter(post => {
    if (!user) return false;
    const postAuthorId = typeof post.author === 'string' ? post.author : post.author?._id;
    return postAuthorId === user.id || postAuthorId === user._id;
  });

  console.log(myPosts)
  const handleCreateClick = () => navigate('/create');

  return (
    <div>
      <div className='flex justify-between px-12 py-6 items-center'>
        <h1 className='text-2xl font-bold'>My Posts</h1>
        <button className='p-2 rounded-md bg-purple-400' onClick={handleCreateClick}>
          + Create Post
        </button>
      </div>

      <div className="px-12">
        {loading && <div>Loading...</div>}
        {error && <div className="text-red-400">{error}</div>}
        {(!loading && myPosts && myPosts.length === 0) && <div>No posts yet.</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myPosts && myPosts.map(post => (
            <div key={post._id} className="rounded-lg bg-gray-100 p-4 shadow">
              <h2 className="text-lg text-black font-semibold">{post.title}</h2>

              {post.image && (
                <img
                  src={`http://localhost:5000/${post.image.replace(/\\/g, '/')}`}
                  alt="Post"
                  width="300"
                  height="200"
                  className="my-2 rounded-md w-full h-auto object-cover"
                />
              )}

              <p className="text-sm text-gray-700">
                {post.content.slice(0, 120)}{post.content.length > 120 && "..."}
              </p>

              <div className="text-xs text-gray-500 mt-1">
                Tags: {post.tags?.join(', ')}
              </div>
              <div className="flex gap-2 mt-2">
                <button className="bg-blue-500 text-white px-3 py-1 rounded">View</button>
                <button className="bg-green-500 text-white px-3 py-1 rounded">Edit</button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
