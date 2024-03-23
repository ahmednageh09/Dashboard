import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { CButton } from '@coreui/react'
import Table from '../../../components/table'
import Chart from '../../../components/chart'
import { useReactToPrint } from 'react-to-print'

export default function ProductsPurchased() {
  const navigate = useNavigate()
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
            path="/reports/products_purchased?type=chart"
            chartName="products_profit_chart"
          />
        </div>
      ) : (
        <Table
          path="/reports/products_purchased"
          ref={componentRef}
          printAction={handlePrint}
          showFilter={false}
          showDate={false}
          columns={[
            { name: 'ID', selector: (row) => row.id },
            { name: 'Product', selector: (row) => row.title },
            { name: 'Type', selector: (row) => row.type },
            { name: 'Purchased Count', selector: (row) => row.purchased_count },
            { name: 'Total Sales', selector: (row) => row.sales_total },
          ]}
          keys={['id', 'title', 'type', 'purchased_count', 'sales_total']}
          showActions={true}
          buttonNames={['Details']}
          actions={[(row) => navigate(`/reports/products_purchased/${row.id}`)]}
        />
      )}
    </>
  )
}
