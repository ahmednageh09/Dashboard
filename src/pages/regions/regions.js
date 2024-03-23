import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { axiosInstance } from '../../axiosConfig'
import { toast } from 'react-toastify'
import ActionButton from '../../components/actionButton/actionButton'
import Table from '../../components/table'
import Modal from '../../components/modal'

export default function Regions() {
  const [data, setData] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [createModal, setCreateModal] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [regionName, setRegionName] = useState('')
  const [regionOrder, setRegionOrder] = useState('')
  const [regionId, setRegionId] = useState('')
  const [titleErrorMessage, setTitleErrorMessage] = useState('')
  const [selectErrorMessage, setSelectErrorMessage] = useState('')
  const [city, setCity] = useState('')
  const [cities, setCities] = useState([])

  useEffect(() => {
    axiosInstance
      .get('/regions')
      .then((response) => setData(response.data))
      .catch((error) => console.error('Error fetching data:', error))
  }, [refresh])

  const handleRegionDelete = (id) => {
    axiosInstance
      .delete(`/region/${id}/delete`)
      .then(() => {
        setRefresh(!refresh)
        handleCloseCreateModal()
        toast.success('Region deleted successfully!')
      })
      .catch((error) => {
        console.error('Error deleting region:', error)
        toast.error('Failed to delete region. Please try again.')
      })
  }

  const handleEditRegion = (id) => {
    axiosInstance
      .get(`/region/${id}`)
      .then((response) => {
        const regionData = response.data.data[0]
        setRegionName(regionData.region_name)
        setRegionId(id)
        setEditingId(id)
      })
      .catch((error) => {
        console.error('Error fetching region data:', error)
        toast.error('Failed to fetch region data. Please try again.')
      })
  }

  useEffect(() => {
    setTitleErrorMessage('')
  }, [editingId])
  // Getting Cities
  useEffect(() => {
    axiosInstance.get('/cities').then((res) => {
      const data = res.data.data
      const getData = data.map((e) => ({ id: e.id, title: e.title }))
      setCities(getData)
    })
  }, [])

  const handleCloseModal = () => {
    setEditingId(null)
  }

  const handleUpdateRegion = () => {
    if (!regionName || regionName.trim() === '') {
      setTitleErrorMessage('Title field is required.')
      return
    }
    axiosInstance
      .patch('/region/update', { region_name: regionName, id: regionId })
      .then(() => {
        setRefresh(!refresh)
        toast.success('Region updated successfully!')
        setTitleErrorMessage('')
        setEditingId(null)
      })
      .catch((error) => {
        console.error('Error updating region:', error)
        toast.error('Failed to update region. Please try again.')
      })
  }
  const handleCreateRegion = () => {
    if (!regionName || regionName.trim() === '') {
      setTitleErrorMessage('Title field is required.')
      return
    }

    const selectedCity = cities.find((item) => item.title === city)
    if (!selectedCity) {
      setSelectErrorMessage('Please select a city.')
      return
    }

    axiosInstance
      .post('/region/store', {
        city_id: selectedCity.id,
        order: regionOrder,
        name: regionName,
      })
      .then(() => {
        setRefresh(!refresh)
        toast.success('Region created successfully!')
        handleCloseCreateModal()
        setCreateModal(false)
      })
      .catch((error) => {
        console.error('Error creating region:', error)
        toast.error('Failed to create region. Please try again.')
      })
  }
  const handleCloseCreateModal = () => {
    setCreateModal(false)
    setEditingId(null)
    setRegionName('')
    setRegionOrder('')
    setCity('')
    setTitleErrorMessage('')
    setSelectErrorMessage('')
  }

  return (
    <>
      <ActionButton name="Add New Region" onClick={() => setCreateModal(true)} />
      {/* Create New Modal */}
      <Modal
        show={createModal}
        handleClose={() => handleCloseCreateModal()}
        handleAction={handleCreateRegion}
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
              value={regionName}
              onChange={(e) => setRegionName(e.target.value)}
            />
            {titleErrorMessage && <span style={{ color: 'red' }}>{titleErrorMessage}</span>}
          </div>
          <div>
            <label className="me-3" htmlFor="city">
              City:{' '}
            </label>
            <select
              className="d-flex"
              style={{
                borderRadius: '10px',
                outLine: 'none',
                padding: '0.5rem',
                border: 'none',
              }}
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option>select City</option>
              {cities.map((city, index) => (
                <option key={index} value={city.title}>
                  {city.title}
                </option>
              ))}
            </select>
            {selectErrorMessage && <span style={{ color: 'red' }}>{selectErrorMessage}</span>}
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
              value={regionOrder}
              onChange={(e) => setRegionOrder(e.target.value)}
            />
          </div>
        </div>
      </Modal>
      <Table
        key={refresh}
        path="/regions"
        showDate={false}
        showFilter={false}
        columns={[
          { name: 'ID', selector: (row) => row.id },
          { name: 'Region Name', selector: (row) => row.region_name },
          { name: 'City Name', selector: (row) => row.city_name },
          { name: 'Created At', selector: (row) => new Date(row.created_at).toLocaleDateString() },
        ]}
        keys={['id', 'region_name', 'city_name', 'created_at']}
        showActions={true}
        buttonNames={['Edit', 'Delete', 'Language']}
        actions={[(row) => handleEditRegion(row.id), (id) => handleRegionDelete(id)]}
      />
      {editingId && (
        <Modal
          show={true}
          handleClose={handleCloseModal}
          handleAction={handleUpdateRegion}
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
                value={regionName}
                onChange={(e) => setRegionName(e.target.value)}
              />
              {titleErrorMessage && <span style={{ color: 'red' }}>{titleErrorMessage}</span>}
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}
