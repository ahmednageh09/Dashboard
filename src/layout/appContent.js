import React, { Suspense, useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CSpinner } from '@coreui/react'
import Page404 from '../pages/page404/Page404'
import Cookies from 'js-cookie'

// routes config
import routes from './routes'

const AppContent = () => {
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const cookieToken = Cookies.get('token')
    setToken(cookieToken)
    setLoading(false)
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Suspense
      fallback={
        <div className="d-flex justify-content-center align-items-center">
          <CSpinner color="primary" />
        </div>
      }
    >
      <Routes>
        {routes.map((route, idx) => {
          return route.element ? (
            <Route
              key={idx}
              path={route.path}
              exact={route.exact}
              name={route.name}
              element={token ? <route.element /> : <Navigate to="/login" replace />}
            />
          ) : (
            <Route key={idx} path="*" element={<Page404 />} />
          )
        })}
        <Route path="/" element={<Navigate to="dashboard" replace />} />
        <Route path="/login" element={<Navigate to="login" replace />} />
      </Routes>
    </Suspense>
  )
}

export default React.memo(AppContent)
