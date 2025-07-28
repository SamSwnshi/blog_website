import React from 'react'
import './App.css'
import Header from './component/Header'
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './component/Dashboard'
import CreatePost from './pages/CreatePost'
import Home from './component/Home'
const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/'element={<Home/>}>Home</Route>
        <Route path='/dashboard'element={<Dashboard/>}>Dashboard</Route>
        <Route path='/login' element={<Login/>}>Login</Route>
        <Route path='/signup'element={<Register/>}>Register</Route>
        <Route path='/create-post'element={<CreatePost/>}>Create Post</Route>
      </Routes>
    </Router>
  )
}

export default App
