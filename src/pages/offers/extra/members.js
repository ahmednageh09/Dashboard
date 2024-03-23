import React from 'react'
import Table from '../../../components/table'
import { useParams } from 'react-router-dom'

export default function Members() {
  const offer = useParams()
  return (
    <>
      <Table
        path={`/offers/${offer.id}/members`}
        showFilter={false}
        showDate={false}
        columns={[
          { name: 'ID', selector: (row) => row.id },
          { name: 'User', selector: (row) => row.user },
          {
            name: 'Products Names',
            selector: (row) => row.products_names.map((product) => product.title).join(', '),
          },
          { name: 'Products Counts', selector: (row) => row.products_count },
          { name: 'Products Names', selector: (row) => row.total_price },
          { name: 'Created At', selector: (row) => new Date(row.created_at).toUTCString() },
        ]}
        keys={['id', 'user', 'products_names', 'products_count', 'total_price', 'created_at']}
      />
    </>
  )
}
