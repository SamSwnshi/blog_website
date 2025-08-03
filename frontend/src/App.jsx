import React, { useEffect } from 'react'
import './App.css'
import Header from './component/Header'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './component/Dashboard'
import CreatePost from './pages/CreatePost'
import Home from './component/Home'
import ProtectedRoute from './component/ProtectedRoutes'
import Profile from './pages/Profile'
import { useDispatch } from 'react-redux'
import { setUser } from './store/userSlice'
import api from './api/api'
import { loginSuccess } from './store/authSlice';
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
  const token = localStorage.getItem('jwt');
  if (token) {
    dispatch(loginSuccess(token)); // set token in redux auth slice
    api.get('/users/me')
      .then(response => {
        dispatch(setUser(response.data));
      })
      .catch(error => {
        console.error('Failed to fetch user data:', error);
        localStorage.removeItem('jwt');
      });
  }
}, [dispatch]);


  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}>Home</Route>
        <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path='/login' element={<Login />}>Login</Route>
        <Route path='/signup' element={<Register />}>Register</Route>
        <Route path='/profile' element={<Profile />}>Profile</Route>
        <Route path='/create' element={<ProtectedRoute><CreatePost /></ProtectedRoute>}>Create Post</Route>
      </Routes>
    </Router>
  )
}

export default App
