import React from 'react'
import { useParams } from 'react-router-dom'
import Table from '../../components/table'

export default function ProductOrders() {
  const { id: prodId } = useParams()
  return (
    <>
      <Table
        path={`/product/customers/${prodId}`}
        showFilter={false}
        showDate={false}
        columns={[
          {
            name: 'User Image',
            selector: (row) => (
              <img
                style={{ borderRadius: '50%', width: '3rem' }}
                src={row.userimage}
                alt="User Img"
              />
            ),
          },
          { name: 'User Name', selector: (row) => row.username + ' ' + row.userlastname },
        ]}
        keys={['username', 'userlastname', 'userimage']}
      />
    </>
  )
}
