import {configureStore} from '@reduxjs/toolkit';

import authReducer from './authSlice'
import postReducer from './postSlice'
export const store  = configureStore({
    reducer: {
        user: authReducer,
        post: postReducer,
    }
})