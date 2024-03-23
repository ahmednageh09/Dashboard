import React from 'react'
import { useNavigate } from 'react-router-dom'
import Table from '../../components/table'

export default function Financial() {
  const navigate = useNavigate()

  return (
    <>
      <Table
        path="/orders/financial_transactions"
        keys={['id', 'user_name', 'payment_method_type', 'payment_paid_type', 'total', 'status']}
        showDate={false}
        showFilter={false}
        showActions={true}
        buttonNames={['Show']}
        actions={[(row) => navigate(`/orders/financial_transactions/details/${row.id}`)]}
        columns={[
          { name: 'Transaction ID', selector: (row) => row.id },
          { name: 'User', selector: (row) => row.user_name },
          { name: 'Payment Method', selector: (row) => row.payment_method_type },
          { name: 'Payment Type', selector: (row) => row.payment_paid_type },
          { name: 'Total', selector: (row) => row.total },
          { name: 'Status', selector: (row) => row.status },
        ]}
      />
    </>
  )
}
