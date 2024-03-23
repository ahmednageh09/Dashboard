import React, { useState } from 'react'
import Table from '../../components/table'

export default function LabelsTranslate() {
  const [editTransLabels, setEditTransLabels] = useState({})
  const [editValues, setEditValues] = useState({})

  return (
    <>
      <div>
        <Table
          path={'/getTranslateDetail?id=890'}
          showDate={false}
          showFilter={false}
          columns={[
            { name: 'ID', selector: (row) => row.item_id },
            { name: 'Label', selector: (row) => row.trans_title },
            {
              name: 'Trans Label',
              selector: (row) => (
                <input
                  style={{
                    fontWeight: 'bold',
                    padding: '5px',
                    border: 'none',
                    borderRadius: '10px',
                    outline: 'none',
                  }}
                  type="text"
                  value={editTransLabels[row.item_id] || row.title}
                  onChange={(e) =>
                    setEditTransLabels({ ...editTransLabels, [row.item_id]: e.target.value })
                  }
                />
              ),
            },
            { name: 'Value', selector: (row) => row.trans_val },
            {
              name: 'Trans Value',
              selector: (row) => (
                <input
                  style={{
                    fontWeight: 'bold',
                    padding: '5px',
                    border: 'none',
                    borderRadius: '10px',
                    outline: 'none',
                  }}
                  type="text"
                  value={editValues[row.item_id] || row.value}
                  onChange={(e) => setEditValues({ ...editValues, [row.item_id]: e.target.value })}
                />
              ),
            },
          ]}
          keys={['item_id', 'trans_title', 'title', 'trans_val', 'value']}
        />
        <button className="btn btn-success m-3">Save</button>
      </div>
    </>
  )
}
