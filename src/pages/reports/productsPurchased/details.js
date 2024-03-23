import React from 'react'
import { useParams } from 'react-router-dom'
import Table from '../../../components/table'

export default function Details() {
  const { id } = useParams()
  return (
    <>
      <Table
        path={`/reports/products_purchased/${id}`}
        showPrint={false}
        showFilter={false}
        showDate={false}
        columns={[
          { name: 'ID', selector: (row) => row.id },
          { name: 'Order Number', selector: (row) => row.ordernumber },
          { name: 'Status', selector: (row) => row.status },
          { name: 'Created At', selector: (row) => new Date(row.created_at).toLocaleDateString() },
        ]}
        keys={['id', 'ordernumber', 'status', 'created_at']}
      />
    </>
  )
}
