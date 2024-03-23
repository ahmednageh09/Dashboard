import React, { useState, useRef } from 'react'
import { CButton } from '@coreui/react'
import Table from '../../../components/table'
import Chart from '../../../components/chart'
import { useReactToPrint } from 'react-to-print'

export default function Taxes() {
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
          <Chart showPie={false} path="/reports/taxes?type=chart" chartName="taxes_chart" />
        </div>
      ) : (
        <Table
          path="/reports/taxes"
          ref={componentRef}
          printAction={handlePrint}
          showFilter={false}
          showDate={false}
          columns={[
            { name: 'ID', selector: (row) => row.id },
            {
              name: 'Tax Name',
              selector: (row) => row.taxe_name,
              style: { color: 'green', fontWeight: 'bold' },
            },
            { name: 'Title', selector: (row) => row.title },
            { name: 'Tax Percent', selector: (row) => row.tax_percent },
            { name: 'Tax Amount', selector: (row) => row.tax_amount },
          ]}
          keys={['id', 'taxe_name', 'title', 'tax_percent', 'tax_amount']}
        />
      )}
    </>
  )
}
