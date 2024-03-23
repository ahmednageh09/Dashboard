import React from 'react'
import Table from '../../../components/table'

export default function Commision() {
  return (
    <>
      <Table
        path="/offers/commission"
        showFilter={false}
        showDate={false}
        columns={[
          { name: 'User Image', selector: (row) => <img src={row.image} alt="User" /> },
          { name: 'Used Times', selector: (row) => row.title },
          { name: 'Price', selector: (row) => Number(row.price).toFixed(2) },
          { name: 'Cost', selector: (row) => row.cost },
          { name: 'Commission', selector: (row) => row.commition },
        ]}
        keys={['image', 'title', 'price', 'cost', 'commition']}
      />
    </>
  )
}
