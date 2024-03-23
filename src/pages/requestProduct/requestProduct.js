import React from 'react'
import Table from '../../components/table'

export default function RequestProduct() {
  return (
    <>
      <Table
        path="/products/request"
        showFilter={false}
        showDate={false}
        columns={[
          { name: 'ID', selector: (row) => row.id },
          { name: 'Product', selector: (row) => row.title },
          { name: 'Details', selector: (row) => row.details },
          { name: 'User', selector: (row) => row.user },
          { name: 'Created At', selector: (row) => new Date(row.created_at).toUTCString() },
        ]}
        keys={['id', 'title', 'details', 'user', 'created_at']}
      />
    </>
  )
}
