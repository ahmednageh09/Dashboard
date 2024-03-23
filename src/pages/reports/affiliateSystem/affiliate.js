import React, { useRef } from 'react'
import Table from '../../../components/table'
import { useReactToPrint } from 'react-to-print'

export default function Affiliate() {
  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })
  return (
    <>
      <Table
        ref={componentRef}
        printAction={handlePrint}
        path="/reports/affiliateSystem"
        showFilter={false}
        showDate={false}
        columns={[
          { name: 'ID', selector: (row) => row.id },
          { name: 'Name', selector: (row) => row.name },
          { name: 'Balance', selector: (row) => row.balance },
          { name: 'Products Count', selector: (row) => row.products_count },
          { name: 'Sales', selector: (row) => row.sales },
        ]}
        keys={['id', 'name', 'balance', 'products_count', 'sales']}
      />
    </>
  )
}
