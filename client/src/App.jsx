import React from 'react'
import './App.css'
import Header from './component/Header'
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './component/Dashboard'
import CreatePost from './pages/CreatePost'
import Home from './component/Home'
import ProtectedRoute from './component/ProtectedRoutes'
import Profile from './pages/Profile'
const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}>Home</Route>
        <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path='/login' element={<Login />}>Login</Route>
        <Route path='/signup' element={<Register />}>Register</Route>
        <Route path='/profile' element={<Profile />}>Profile</Route>
        <Route path='/create-post' element={<ProtectedRoute><CreatePost /></ProtectedRoute>}>Create Post</Route>
      </Routes>
    </Router>
  )
}

export default App
