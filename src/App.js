import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import { ToastContainer } from 'react-toastify'
import { useSelector } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'

// Container
const Layout = React.lazy(() => import('./layout/Layout'))

// Pages
const Login = React.lazy(() => import('./pages/login/Login'))

function App() {
  const direction = useSelector((state) => state.lang.direction)

  useEffect(() => {
    document.documentElement.dir = direction
  }, [direction])

  const toastAutoCloseTime = 2000
  return (
    <Router>
      <ToastContainer autoClose={toastAutoCloseTime} />
      <Routes>
        <Route exact path="/login" name="Login Page" element={<Login />} />
        <Route path="*" name="Home" element={<Layout />} />
      </Routes>
    </Router>
  )
}

export default App
