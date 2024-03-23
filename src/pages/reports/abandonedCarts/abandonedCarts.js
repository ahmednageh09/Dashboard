import React, { useState, useRef } from 'react'
import { CButton } from '@coreui/react'
import Table from '../../../components/table'
import Chart from '../../../components/chart'
import { useReactToPrint } from 'react-to-print'

export default function AbandonedCarts() {
  const [showChart, setShowChart] = useState(false)
  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  function handleChartClick() {
    setShowChart(true)
  }
  function handleReportsClick() {
    setShowChart(false)
  }
  return (
    <>
      <div className="m-4">
        <CButton
          onClick={handleReportsClick}
          className="mx-2"
          color={!showChart ? 'info' : 'secondary'}
        >
          Reports
        </CButton>
        <CButton onClick={handleChartClick} color={showChart ? 'info' : 'secondary'}>
          Chart
        </CButton>
      </div>

      {showChart ? (
        <div className="d-flex justify-content-center align-content-center w-100">
          <Chart
            showPie={false}
            path="/reports/abandoned_carts?type=chart"
            chartName="abandoned_carts_profit_chart"
          />
        </div>
      ) : (
        <Table
          path="/reports/abandoned_carts"
          ref={componentRef}
          printAction={handlePrint}
          showFilter={false}
          showDate={false}
          columns={[
            { name: 'ID', selector: (row) => row.id },
            { name: 'Name', selector: (row) => row.name },
            { name: 'Total User Items', selector: (row) => row.total_user_items },
            {
              name: 'Products Count Abandoned',
              selector: (row) => row.abandoned_carts_products_count,
            },
            {
              name: 'Toatal Amounts',
              selector: (row) => row.total_amount,
            },
          ]}
          keys={[
            'id',
            'name',
            'total_user_items',
            'abandoned_carts_products_count',
            'total_amount',
          ]}
        />
      )}
    </>
  )
}
