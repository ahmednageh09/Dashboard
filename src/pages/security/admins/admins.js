import React from 'react'
import ActionButton from '../../../components/actionButton/actionButton'
import Table from '../../../components/table'
import { useNavigate } from 'react-router-dom'

export default function Admins() {
  const navigate = useNavigate()
  return (
    <>
      <ActionButton name="Create New Admin" onClick={() => navigate('/admins/create')} />
      <ActionButton name="Export Admins" />
      <Table
        path="admins/manage/index"
        showDate={false}
        showFilter={false}
        columns={[
          { name: 'ID', selector: (row) => row.id },
          { name: 'Name', selector: (row) => row.first_name },
          {
            name: 'Image',
            selector: (row) => (
              <img
                style={{ borderRadius: '50%', width: '3rem' }}
                src={row.image}
                alt="admin image"
              />
            ),
          },
          { name: 'Email', selector: (row) => row.email },
          { name: 'Created At', selector: (row) => new Date(row.created_at).toLocaleDateString() },
        ]}
        keys={['id', 'first_name', 'image', 'email', 'created_at']}
        showActions={true}
        buttonNames={['Edit', 'Delete']}
      />
    </>
  )
}
