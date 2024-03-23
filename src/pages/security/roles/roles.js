import React from 'react'
import ActionButton from '../../../components/actionButton/actionButton'
import Table from '../../../components/table'
import { useNavigate } from 'react-router-dom'

export default function Roles() {
  const navigate = useNavigate()
  return (
    <>
      <ActionButton name="Create New Role" onClick={() => navigate('/role/create')} />
      <ActionButton name="Export Roles" />
      <Table
        path="roles/index"
        showDate={false}
        showFilter={false}
        columns={[
          { name: 'ID', selector: (row) => row.id },
          { name: 'Name', selector: (row) => row.name },
          { name: 'Created At', selector: (row) => new Date(row.created_at).toLocaleDateString() },
          { name: 'Updated At', selector: (row) => new Date(row.updated_at).toLocaleDateString() },
        ]}
        keys={['id', 'name', 'created_at', 'updated_at']}
        showActions={true}
        buttonNames={['Edit', 'Delete']}
      />
    </>
  )
}
