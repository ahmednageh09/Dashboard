import React, { useState } from 'react'
import { CButton } from '@coreui/react'
import ReportCard from '../../components/sidebar/reportCard/reportCard'
import Google from './googleAnalytics/google'
import { Outlet, useLocation } from 'react-router-dom'

export default function Reports() {
  const [showGoogle, setShowGoogle] = useState(false)

  function handleGoogleClick() {
    setShowGoogle(true)
  }
  function handleReportsClick() {
    setShowGoogle(false)
  }
  const location = useLocation()
  const isNestedRoute = location.pathname.includes('/reports/')
  return (
    <>
      {!isNestedRoute && (
        <div>
          <div className="m-4">
            <CButton
              onClick={handleReportsClick}
              className="mx-2"
              color={showGoogle ? 'secondary' : 'info'}
            >
              Reports
            </CButton>
            <CButton onClick={handleGoogleClick} color={!showGoogle ? 'secondary' : 'info'}>
              Google Analytics
            </CButton>
          </div>
          <div>
            {showGoogle ? (
              <Google path={'/reports/google'} />
            ) : (
              <div className="row d-flex justify-content-evenly">
                <ReportCard path="./products_prices" title={'Products Prices'} />
                <ReportCard path="./affiliateSystem" title={'Affiliate System'} />
                <ReportCard path="./customers_balances" title={'Customers Balances'} />
                <ReportCard path="./log" title={'Customers log'} />
                <ReportCard path="./customers_orders" title={'Customers Orders'} />
                <ReportCard path="./customers_search" title={'Customers Search'} />
                <ReportCard path="./rewards_points" title={'Rewards Points'} />
                <ReportCard path="./taxes" title={'Taxes'} />
                <ReportCard path="./shipping" title={'Shipping'} />
                <ReportCard path="./refund" title={'Refund'} />
                <ReportCard path="./sales" title={'Sales'} />
                <ReportCard path="./discount" title={'Discount Codes'} />
                <ReportCard path="./products_visits" title={'Products Visits'} />
                <ReportCard path="./products_purchased" title={'Products Purchased'} />
                <ReportCard path="./abandoned_carts" title={'Abandoned Carts'} />
                <ReportCard path="./inactive_customers" title={'Inactive Customers'} />
                <ReportCard path="./stock" title={'Stock'} />
                <ReportCard path="./new_products" title={'New Products'} />
                <ReportCard path="./commentsReport" title={'Comments'} />
                <ReportCard path="./payments" title={'Payments'} />
                <ReportCard path="./fav_products" title={'Fav Products'} />
                <ReportCard path="./offersReport" title={'Offers Report'} />
              </div>
            )}
          </div>
        </div>
      )}
      <div>{isNestedRoute && <Outlet />}</div>
    </>
  )
}
