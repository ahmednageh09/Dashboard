import React from 'react'
import Table from '../../components/table'

export default function NotifyMe() {
  return (
    <>
      <Table
        path="/products/notify"
        showFilter={false}
        showDate={false}
        columns={[
          { name: 'ID', selector: (row) => row.id },
          { name: 'Product', selector: (row) => row.title },
          { name: 'User', selector: (row) => row.user },
          { name: 'Created At', selector: (row) => new Date(row.created_at).toUTCString() },
        ]}
        keys={['id', 'title', 'user', 'created_at']}
      />
    </>
  )
}
