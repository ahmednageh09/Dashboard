import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { axiosInstance } from '../../axiosConfig'
import { toast } from 'react-toastify'
import ActionButton from 'src/components/actionButton/actionButton'
import Table from '../../components/table'
import Modal from '../../components/modal'

export default function Countries() {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [createModal, setCreateModal] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [countryTitle, setCountryTitle] = useState('')
  const [countryId, setCountryId] = useState('')
  const [countryOrders, setCountryOrders] = useState('')
  const [countryCode, setCountryCode] = useState('')
  const [titleErrorMessage, setTitleErrorMessage] = useState('')

  useEffect(() => {
    axiosInstance
      .get('/countries')
      .then((response) => setData(response.data))
      .catch((error) => console.error('Error fetching data:', error))
  }, [refresh])

  const handleDeleteCountry = (id) => {
    axiosInstance
      .delete(`/countries/delete/${id}`)
      .then(() => {
        setRefresh(!refresh)
        toast.success('Country deleted successfully!')
      })
      .catch((error) => {
        console.error('Error deleting country:', error)
        toast.error('Failed to delete country. Please try again.')
      })
  }

  const handleEditCountry = (id) => {
    axiosInstance
      .get('/countries/show', { params: { country_id: id } })
      .then((response) => {
        const countryData = response.data
        setCountryTitle(countryData.data.title)
        setCountryId(id)
        setCountryCode(countryData.data.calling_code)
        setEditingId(id)
      })
      .catch((error) => {
        console.error('Error fetching country data:', error)
        toast.error('Failed to fetch country data. Please try again.')
      })
  }
  useEffect(() => {
    setTitleErrorMessage('')
  }, [editingId])

  const handleCloseModal = () => {
    setEditingId(null)
  }

  const handleUpdateCountry = () => {
    if (!countryTitle || countryTitle.trim() === '') {
      setTitleErrorMessage('Title field is required.')
      return
    }
    axiosInstance
      .post('/countries/update', { title: countryTitle, id: countryId, calling_code: countryCode })
      .then(() => {
        console.log(countryId)
        setRefresh(!refresh)
        toast.success('Country updated successfully!')
        setTitleErrorMessage('')
        setEditingId(null)
      })
      .catch((error) => {
        console.error('Error updating country:', error)
        toast.error('Failed to update country. Please try again.')
      })
  }
  const handleCreateCountry = () => {
    if (!countryTitle || countryTitle.trim() === '') {
      setTitleErrorMessage('Title field is required.')
      return
    }
    axiosInstance
      .post('/countries/store', {
        title: countryTitle,
        order: countryOrders,
      })
      .then(() => {
        setRefresh(!refresh)
        toast.success('Country created successfully!')
        handleCloseCreateModal()
      })
      .catch((error) => {
        console.error('Error creating country:', error)
        toast.error('Failed to create country. Please try again.')
      })
  }
  const handleCloseCreateModal = () => {
    setCreateModal(false)
    setCountryOrders('')
    setCountryTitle('')
    setTitleErrorMessage('')
  }

  return (
    <>
      <ActionButton name="Add New Country" onClick={() => setCreateModal(true)} />
      {/* Create New Modal */}
      <Modal
        show={createModal}
        handleClose={() => handleCloseCreateModal()}
        handleAction={handleCreateCountry}
        actionButtonTitle="Create"
      >
        <div className="d-flex align-items-center row gap-3 m-4">
          <div>
            <label className="me-3" htmlFor="title">
              Title:{' '}
            </label>
            <input
              className="d-flex"
              style={{
                borderRadius: '10px',
                outLine: 'none',
                padding: '0.5rem',
                border: 'none',
              }}
              id="title"
              value={countryTitle}
              onChange={(e) => setCountryTitle(e.target.value)}
            />
            {titleErrorMessage && <span style={{ color: 'red' }}>{titleErrorMessage}</span>}
          </div>
          <div>
            <label className="me-3" htmlFor="order">
              Order:{' '}
            </label>
            <input
              type="number"
              className="d-flex"
              style={{
                borderRadius: '10px',
                outLine: 'none',
                padding: '0.5rem',
                border: 'none',
              }}
              id="order"
              value={countryOrders}
              onChange={(e) => setCountryOrders(e.target.value)}
            />
          </div>
        </div>
      </Modal>
      <Table
        key={refresh}
        path="/countries"
        showDate={false}
        showFilter={false}
        columns={[
          { name: 'ID', selector: (row) => row.id },
          { name: 'Title', selector: (row) => row.title },
          { name: 'Created At', selector: (row) => new Date(row.created_at).toLocaleDateString() },
        ]}
        keys={['id', 'title', 'created_at']}
        showActions={true}
        buttonNames={['Edit', 'Delete', 'Show Cities', 'Language']}
        actions={[
          (row) => handleEditCountry(row.id),
          (row) => handleDeleteCountry(row.id),
          (row) => navigate(`/country/cities/${row.id}`),
        ]}
      />
      {editingId && (
        <Modal
          show={true}
          handleClose={handleCloseModal}
          handleAction={handleUpdateCountry}
          actionButtonTitle="Update"
        >
          <div className="d-flex align-items-center row gap-3 m-4">
            <div>
              <label className="me-3" htmlFor="title">
                Title:{' '}
              </label>
              <input
                className="d-flex"
                style={{
                  borderRadius: '10px',
                  outLine: 'none',
                  padding: '0.5rem',
                  border: 'none',
                }}
                id="title"
                value={countryTitle}
                onChange={(e) => setCountryTitle(e.target.value)}
              />
              {titleErrorMessage && <span style={{ color: 'red' }}>{titleErrorMessage}</span>}
            </div>
            <div>
              <label className="me-3" htmlFor="title">
                Code:{' '}
              </label>
              <input
                className="d-flex"
                style={{
                  borderRadius: '10px',
                  outLine: 'none',
                  padding: '0.5rem',
                  border: 'none',
                }}
                id="title"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
              />
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}
