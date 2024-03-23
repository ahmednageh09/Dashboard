import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import FinancialCard from 'src/pages/financial/financialDetails/financialCard'

export default function FinancialDetails() {
  const { id: transactionId } = useParams()
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      <FinancialCard
        path={`/orders/online/show/${transactionId}`}
        indices={['transaction', 'order', 'user', 'transaction_type']}
        onLoad={() => setIsLoading(false)}
      />
    </>
  )
}
