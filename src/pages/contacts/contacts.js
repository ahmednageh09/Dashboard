import React from 'react'
import Table from '../../components/table'

export default function Contacts() {
  return (
    <>
      <Table
        path="/contact/all"
        showDate={false}
        showFilter={false}
        columns={[
          { name: 'ID', selector: (row) => row.id },
          { name: 'User Name', selector: (row) => row.name },
          { name: 'Email', selector: (row) => row.email },
          { name: 'Phone', selector: (row) => row.phone },
          { name: 'Country', selector: (row) => row.country },
          { name: 'Phone', selector: (row) => row.created_at },
        ]}
        keys={['id', 'name', 'email', 'phone', 'created_at']}
        showActions={true}
        buttonNames={['Show', 'Delete']}
      />
    </>
  )
}
