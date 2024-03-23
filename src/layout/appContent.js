import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CSpinner } from '@coreui/react'
import Page404 from '../pages/page404/Page404'

// routes config
import routes from './routes'

const AppContent = () => {
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
          // Check if the route has an element and render it, otherwise render the 404 page
          return route.element ? (
            <Route
              key={idx}
              path={route.path}
              exact={route.exact}
              name={route.name}
              element={<route.element />}
            />
          ) : (
            <Route key={idx} path="*" element={<Page404 />} />
          )
        })}
        <Route path="/" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </Suspense>
  )
}

export default React.memo(AppContent)
