import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  const currentYear = new Date().getFullYear()

  return (
    <CFooter className="mt-2">
      <div>
        <a href="https://soin.serv5group.com/" target="_blank" rel="noopener noreferrer">
          SOIN
        </a>
        <span className="ms-1">&copy; {currentYear} creativeLabs.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="https://serv5.com/" target="_blank" rel="noopener noreferrer">
          SERV5
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
