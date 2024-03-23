import React, { useState, useRef } from 'react'
import { CButton } from '@coreui/react'
import Table from '../../../components/table'
import Chart from '../../../components/chart'
import { useReactToPrint } from 'react-to-print'

export default function RewardsPoints() {
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
            path="/reports/rewards_points?type=chart"
            chartName="rewards_points_chart"
          />
        </div>
      ) : (
        <Table
          path="/reports/rewards_points"
          ref={componentRef}
          printAction={handlePrint}
          showFilter={false}
          showDate={false}
          columns={[
            { name: 'ID', selector: (row) => row.id },
            { name: 'Name', selector: (row) => row.name },
            { name: 'Email', selector: (row) => row.email },
            { name: 'Points Count', selector: (row) => row.points_count },
            { name: 'Points Count Rewarded', selector: (row) => row.points_count_rewarded },
            { name: 'Points Count Total', selector: (row) => row.points_count_total },
            { name: 'Total Purchased', selector: (row) => row.total_purchased },
            { name: 'Points Amount', selector: (row) => row.points_amount },
          ]}
          keys={[
            'id',
            'name',
            'email',
            'points_count',
            'points_count_rewarded',
            'points_count_total',
            'total_purchased',
            'points_amount',
          ]}
        />
      )}
    </>
  )
}
