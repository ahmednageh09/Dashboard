import React, { useState, useRef } from 'react'
import { CButton } from '@coreui/react'
import Table from '../../../components/table'
import { useReactToPrint } from 'react-to-print'

export default function Comments() {
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
      <Table
        path="/reports/comments"
        ref={componentRef}
        printAction={handlePrint}
        showFilter={false}
        showDate={false}
        columns={[
          { name: 'ID', selector: (row) => row.id },
          { name: 'User Name', selector: (row) => row.username },
          { name: 'Comment', selector: (row) => row.comment },
          { name: 'Status', selector: (row) => row.published },
        ]}
        keys={['id', 'username', 'comment', 'published']}
      />
    </>
  )
}
