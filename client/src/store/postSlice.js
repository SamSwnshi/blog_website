// src/features/posts/postSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
    loading: false,
    error: null,
};

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        startLoading(state) {
            state.loading = true;
            state.error = null;
        },
        fetchPostsSuccess(state, action) {
            state.loading = false;
            state.posts = action.payload;
            state.error = null;
        },
        fetchPostsFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        addPost(state, action) {
            state.posts.unshift(action.payload);
        },
        updatePost(state, action) {
            const index = state.posts.findIndex(
                (post) => post._id === action.payload._id
            );
            if (index !== -1) {
                state.posts[index] = action.payload;
            }
        },
        deletePost(state, action) {
            state.posts = state.posts.filter((post) => post._id !== action.payload);
        },
        toggleLike(state, action) {
            const { id, likedByCurrentUser, likesCount } = action.payload;
            const post = state.posts.find((post) => post._id === id);
            if (post) {
                post.likedByCurrentUser = likedByCurrentUser;
                post.likedByCount = likesCount;
            }
        },
    },
});

export const {
    startLoading,
    fetchPostsSuccess,
    fetchPostsFailure,
    addPost,
    updatePost,
    deletePost,
    toggleLike,
} = postSlice.actions;

export default postSlice.reducer;
