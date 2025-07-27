import React from 'react'
import './App.css'
import Header from './component/Header'
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom'
import Register from './component/Register'
import Login from './component/Login'
import Dashboard from './component/Dashboard'
const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/login' element={<Login/>}>Login</Route>
        <Route path='/signup'element={<Register/>}>Register</Route>
        <Route path='/'element={<Dashboard/>}>Dashboard</Route>
      </Routes>
    </Router>
  )
}

export default App
