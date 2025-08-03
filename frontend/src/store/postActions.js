// postActions.js
import api from '../api/api.js'; // your axios instance
import {
  startLoading,
  fetchPostsSuccess,
  fetchPostsFailure,
  addPost,
  updatePost,
  deletePost,
  toggleLike,
} from './postSlice';

// Fetch all posts from the API
export const fetchPosts = () => async (dispatch) => {
  dispatch(startLoading());
  try {
    const response = await api.get('/posts');
    dispatch(fetchPostsSuccess(response.data));
  } catch (error) {
    dispatch(fetchPostsFailure(error.response?.data?.message || error.message));
  }
};

// Create a new post
export const createPost = (postData) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const response = await api.post('/posts', postData);
    dispatch(addPost(response.data));
  } catch (error) {
    dispatch(fetchPostsFailure(error.response?.data?.message || error.message));
  }
};

// Update a post by ID
export const editPost = (id, postData) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const response = await api.put(`/posts/${id}`, postData);
    dispatch(updatePost(response.data));
  } catch (error) {
    dispatch(fetchPostsFailure(error.response?.data?.message || error.message));
  }
};

// Delete a post by ID
export const removePost = (id) => async (dispatch) => {
  dispatch(startLoading());
  try {
    await api.delete(`/posts/${id}`);
    dispatch(deletePost(id));
  } catch (error) {
    dispatch(fetchPostsFailure(error.response?.data?.message || error.message));
  }
};

// Toggle like/unlike on a post
export const togglePostLike = (id) => async (dispatch) => {
  try {
    const response = await api.post(`/posts/${id}/like`);
    dispatch(toggleLike({ id, ...response.data }));
  } catch (error) {
    dispatch(fetchPostsFailure(error.response?.data?.message || error.message));
  }
};
