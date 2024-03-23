import React, { useState } from 'react'
import ActionButton from '../../components/actionButton/actionButton'
import Table from '../../components/table'

export default function MailingTemplates() {
  const [path, setPath] = useState('/orders/all')
  return (
    <>
      <h3>Mailing Templates</h3>
      <div className="my-3">
        <ActionButton name="Clients" onClick={() => setPath('/all_orders')} />
        <ActionButton name="Orders" />
        <ActionButton name="Invoices" />
        <ActionButton name="Tickets" />
        <ActionButton name="Staff" />
        <ActionButton name="Custom Templates" />
      </div>
      {/* <Table
        key={path}
        path={path}
        showDate={false}
        showFilter={false}
        columns={[
          { name: 'ID', selector: (row) => row.id },
          {
            name: 'User Image',
            selector: (row) => (
              <img
                style={{ borderRadius: '50%', width: '3rem' }}
                src={row.user_image}
                alt="Uer Image"
              />
            ),
          },
          { name: 'Type', selector: (row) => row.type },
          { name: 'User', selector: (row) => row.user_name },
          { name: 'Status', selector: (row) => row.status },
          { name: 'Order Number', selector: (row) => row.ordernumber },
          { name: 'Created At', selector: (row) => new Date(row.created_at).toLocaleString() },
        ]}
        keys={['id', 'user_image', 'type', 'user_name', 'status', 'ordernumber', 'created_at']}
        showActions={true}
        buttonNames={['Edit', 'Show', 'Print']}
        actions={[]}
      /> */}
    </>
  )
}
