import React, { useState, useRef } from 'react'
import { CButton } from '@coreui/react'
import Table from '../../../components/table'
import Chart from '../../../components/chart'
import { useReactToPrint } from 'react-to-print'

export default function Sales() {
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
        <div className="row d-flex justify-content-evenly mb-4">
          <Chart path="/reports/sales?type=chart" chartName="profit_chart" />

          <Chart path="/reports/sales?type=chart" chartName="brand_chart" />

          <Chart path="/reports/sales?type=chart" chartName="price_chart" />

          <Chart path="/reports/sales?type=chart" chartName="offer_chart" />

          <Chart path="/reports/sales?type=chart" chartName="feature_chart" />
        </div>
      ) : (
        <Table
          path="/reports/sales"
          ref={componentRef}
          printAction={handlePrint}
          showFilter={false}
          showDate={false}
          columns={[
            { name: 'ID', selector: (row) => row.id },
            { name: 'Month', selector: (row) => row.month },
            { name: 'Products Count', selector: (row) => row.products_count },
            { name: 'Sales Total', selector: (row) => row.sales_total },
          ]}
          keys={['id', 'month', 'products_count', 'sales_total']}
        />
      )}
    </>
  )
}
