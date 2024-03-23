import React from 'react'
import { useParams } from 'react-router-dom'
import Table from '../../components/table'

export default function Benficary() {
  const prodId = useParams()

  return (
    <>
      <Table
        path={`/discounts/${prodId.id}/benficary`}
        showFilter={false}
        showDate={false}
        columns={[
          { name: 'Id', selector: (row) => row.id },
          { name: 'Name', selector: (row) => row.name },
          { name: 'Title', selector: (row) => row.title },
          { name: 'Using Times', selector: (row) => row.using_times },
          { name: 'Bonus Percent', selector: (row) => row.bonus_percent },
          { name: 'Start Date', selector: (row) => row.start_date },
          { name: 'End Date', selector: (row) => row.end_date },
        ]}
        keys={[
          'id',
          'name',
          'title',
          'using_times',
          'status',
          'bonus_percent',
          'start_date',
          'end_date',
        ]}
      />
    </>
  )
}
