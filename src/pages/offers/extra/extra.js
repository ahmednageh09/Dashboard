import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../../axiosConfig'
import Table from '../../../components/table'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export default function Extra() {
  const [status, setStatus] = useState({})
  const [refresh, setRefresh] = useState(false)

  const navigate = useNavigate()
  useEffect(() => {
    axiosInstance
      .get('/offers?type=extra')
      .then((response) => {
        const statusState = response.data.data.reduce((acc, row) => {
          acc[row.id] = row.status === 'checked' ? 1 : 0
          return acc
        }, {})
        setStatus(statusState)
      })
      .catch((error) => console.error('Error fetching data:', error))
  }, [refresh])

  const handleStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 1 ? 0 : 1
      await axiosInstance.get(`/offers/updateActive?id=${id}&active=${newStatus}`)
      setStatus({
        ...status,
        [id]: newStatus,
      })
      setRefresh(!refresh)
      toast.success('Status updated successfully!')
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const toggleStatus = (id, currentStatus) => {
    handleStatus(id, currentStatus)
  }
  return (
    <>
      <Table
        key={refresh}
        path="/offers?type=extra"
        showFilter={false}
        showDate={false}
        columns={[
          { name: 'Title', selector: (row) => row.title },
          { name: 'Used Times', selector: (row) => row.used_times },
          { name: 'Start Date', selector: (row) => row.start_date },
          { name: 'End Date', selector: (row) => row.end_date },
          {
            name: 'Status',
            selector: (row) => (
              <button
                type="button"
                className={`btn ${status[row.id] === 1 ? 'btn-success' : 'btn-secondary'}`}
                onClick={() => toggleStatus(row.id, status[row.id])}
              >
                {status[row.id] === 1 ? 'Active' : 'Not Active'}
              </button>
            ),
          },
        ]}
        keys={['id', 'title', 'used_times', 'start_date', 'end_date', 'status']}
        showActions={true}
        buttonNames={['Members', 'Edit', 'Delete']}
        actions={[
          (row) => {
            navigate(`/offers/members/${row.id}`)
          },
          (row) => {
            navigate(`/offers/edit/${row.id}`)
          },
        ]}
      />
    </>
  )
}
