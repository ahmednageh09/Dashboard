import React, { useRef } from 'react'
import Table from '../../../components/table'
import { useReactToPrint } from 'react-to-print'

export default function CustomersLog() {
  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })
  return (
    <>
      <Table
        path="/reports/log"
        ref={componentRef}
        printAction={handlePrint}
        showFilter={false}
        showDate={false}
        columns={[
          { name: 'ID', selector: (row) => row.id },
          { name: 'Name', selector: (row) => row.name },
          { name: 'Page', selector: (row) => row.page },
          {
            name: 'Created At',
            selector: (row) => new Date(row.created_at).toLocaleDateString(),
          },
          { name: 'Ip', selector: (row) => row.ip },
        ]}
        keys={['id', 'name', 'page', 'created_at', 'ip']}
      />
    </>
  )
}
