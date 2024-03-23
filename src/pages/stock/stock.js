import React from 'react'
import ActionButton from '../../components/actionButton/actionButton'
import Table from '../../components/table'

export default function Stock() {
  const handleViewProduct = () => {
    window.open('https://api.soin.serv5group.com/ar/product/602', '_blank')
  }
  return (
    <>
      <ActionButton name="Update Stock" path="/stocks/updateStock" />
      <Table
        path="/stocks"
        showDate={false}
        showFilter={false}
        columns={[
          { name: 'ID', selector: (row) => row.id },
          { name: 'Product Name', selector: (row) => row.title },
          { name: 'Quantity', selector: (row) => row.quantity },
          { name: 'User', selector: (row) => row.user_name },
          { name: 'Details', selector: (row) => row.details },
          { name: 'Created At', selector: (row) => row.created_at },
        ]}
        keys={['id', 'title', 'quantity', 'user_name', 'details', 'created_at']}
        showActions={true}
        buttonNames={['View Product']}
        actions={[handleViewProduct]}
      />
    </>
  )
}
