import React, { useState, useRef } from 'react'
import Table from '../../../components/table'
import { CButton } from '@coreui/react'
import Chart from '../../../components/chart'
import { useReactToPrint } from 'react-to-print'

export default function CustomersBalances() {
  const [showChart, setShowChart] = useState(false)

  function handleChartClick() {
    setShowChart(true)
  }
  function handleReportsClick() {
    setShowChart(false)
  }
  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })
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
            path="/reports/customers_balances?type=chart"
            chartName="customer_balance_chart"
          />
        </div>
      ) : (
        <Table
          ref={componentRef}
          printAction={handlePrint}
          path="/reports/customers_balances"
          showFilter={false}
          showDate={false}
          columns={[
            { name: 'ID', selector: (row) => row.id },
            { name: 'Name', selector: (row) => row.name },
            { name: 'Email', selector: (row) => row.email },
            { name: 'Title', selector: (row) => row.title },
            { name: 'Balance', selector: (row) => row.balance },
          ]}
          keys={['id', 'name', 'email', 'title', 'balance']}
        />
      )}
    </>
  )
}
