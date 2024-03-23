import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { axiosInstance } from '../../axiosConfig'
import { toast } from 'react-toastify'
import ActionButton from 'src/components/actionButton/actionButton'
import Table from '../../components/table'
import Modal from '../../components/modal'

export default function Cities() {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [createModal, setCreateModal] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [cityName, setCityName] = useState('')
  const [cityOrder, setCityOrder] = useState('')
  const [cityTitle, setCityTitle] = useState('')
  const [cityLat, setCityLat] = useState('')
  const [cityLong, setCityLong] = useState('')
  const [cityId, setCityId] = useState('')
  const [titleErrorMessage, setTitleErrorMessage] = useState('')
  const [selectErrorMessage, setSelectErrorMessage] = useState('')
  const [counrty, setCountry] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axiosInstance
      .get('/cities')
      .then((response) => setData(response.data))
      .catch((error) => console.error('Error fetching data:', error))
  }, [refresh])

  const handleCityDelete = (id) => {
    axiosInstance
      .delete(`/cities/delete/${id}`)
      .then(() => {
        setRefresh(!refresh)
        toast.success('City deleted successfully!')
      })
      .catch((error) => {
        console.error('Error deleting city:', error)
        toast.error('Failed to delete city. Please try again.')
      })
  }

  const handleEditCity = (id) => {
    axiosInstance
      // .get('/city/show', { params: { city_id: id } })
      .get('/countries/show', { params: { country_id: id } })
      .then((response) => {
        const cityData = response.data
        console.log(cityData)
        setCityName(cityData.data.title)
        setCityId(id)
        setEditingId(id)
      })
      .catch((error) => {
        console.error('Error fetching city data:', error)
        toast.error('Failed to fetch city data. Please try again.')
      })
  }

  useEffect(() => {
    setTitleErrorMessage('')
  }, [editingId])
  // Getting Countries
  useEffect(() => {
    axiosInstance.get('/countries').then((res) => {
      const data = res.data.data
      const getData = data.map((e) => ({ id: e.id, title: e.title }))
      setCountries(getData)
    })
  }, [])

  const handleCloseModal = () => {
    setEditingId(null)
  }

  const handleUpdateCity = () => {
    if (!cityName || cityName.trim() === '') {
      setTitleErrorMessage('Title field is required.')
      return
    }
    axiosInstance
      .post('/cities/update', { title: cityName, id: cityId })
      .then(() => {
        setRefresh(!refresh)
        toast.success('City updated successfully!')
        setTitleErrorMessage('')
        setEditingId(null)
      })
      .catch((error) => {
        console.error('Error updating city:', error)
        toast.error('Failed to update city. Please try again.')
      })
  }
  const handleCreateCity = () => {
    if (!cityTitle || cityTitle.trim() === '') {
      setTitleErrorMessage('Title field is required.')
      return
    }

    const selectedCountry = countries.find((item) => item.title === counrty)
    if (!selectedCountry) {
      setSelectErrorMessage('Please select a country.')
      return
    }

    const res = axiosInstance
      .post('/cities/store', {
        title: cityTitle,
        country_id: selectedCountry.id,
        order: cityOrder,
        lat: cityLat,
        lon: cityLong,
      })
      .then(() => {
        setRefresh(!refresh)
        toast.success('City created successfully!')
        handleCloseCreateModal()
      })
      .catch((error) => {
        console.error('Error creating city:', error)
        toast.error('Failed to create city. Please try again.')
      })
  }
  const handleCloseCreateModal = () => {
    setCreateModal(false)
    setCityName('')
    setCityOrder('')
    setCityTitle('')
    setCityLat('')
    setCityLong('')
    setCityId('')
    setTitleErrorMessage('')
    setSelectErrorMessage('')
    setCountry('')
  }
  return (
    <>
      <ActionButton name="Add New City" onClick={() => setCreateModal(true)} />
      {/* Create New Modal */}
      <Modal
        show={createModal}
        handleClose={() => handleCloseCreateModal()}
        handleAction={handleCreateCity}
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
              value={cityTitle}
              onChange={(e) => setCityTitle(e.target.value)}
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
              value={cityOrder}
              onChange={(e) => setCityOrder(e.target.value)}
            />
          </div>
          <div>
            <label className="me-3" htmlFor="country">
              Country:{' '}
            </label>
            <select
              className="d-flex"
              style={{
                borderRadius: '10px',
                outLine: 'none',
                padding: '0.5rem',
                border: 'none',
              }}
              id="country"
              value={counrty}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option>select Country</option>
              {countries.map((counrty, index) => (
                <option key={index} value={counrty.title}>
                  {counrty.title}
                </option>
              ))}
            </select>
            {selectErrorMessage && <span style={{ color: 'red' }}>{selectErrorMessage}</span>}
          </div>
          <div>
            <label className="me-3" htmlFor="lat">
              Latitude:{' '}
            </label>
            <input
              className="d-flex"
              style={{
                borderRadius: '10px',
                outLine: 'none',
                padding: '0.5rem',
                border: 'none',
              }}
              id="lat"
              value={cityLat}
              onChange={(e) => setCityLat(e.target.value)}
            />
          </div>
          <div>
            <label className="me-3" htmlFor="long">
              Longitude:{' '}
            </label>
            <input
              className="d-flex"
              style={{
                borderRadius: '10px',
                outLine: 'none',
                padding: '0.5rem',
                border: 'none',
              }}
              id="long"
              value={cityLong}
              onChange={(e) => setCityLong(e.target.value)}
            />
          </div>
        </div>
      </Modal>
      <Table
        key={refresh}
        path="/cities"
        showDate={false}
        showFilter={false}
        columns={[
          { name: 'ID', selector: (row) => row.id },
          { name: 'City', selector: (row) => row.title },
          { name: 'Country', selector: (row) => row.country },
          { name: 'Created At', selector: (row) => new Date(row.created_at).toLocaleDateString() },
        ]}
        keys={['id', 'title', 'country', 'created_at']}
        showActions={true}
        buttonNames={['Edit', 'Delete', 'Show Regions', 'Language']}
        actions={[
          (row) => handleEditCity(row.id),
          (row) => handleCityDelete(row.id),
          (row) => navigate(`/city/regions/${row.id}`),
        ]}
      />
      {editingId && (
        <Modal
          show={true}
          handleClose={handleCloseModal}
          handleAction={handleUpdateCity}
          actionButtonTitle="Update"
        >
          <div className="d-flex align-items-center row gap-3 m-4">
            {/* <div>
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
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
              />
              {titleErrorMessage && <span style={{ color: 'red' }}>{titleErrorMessage}</span>}
            </div> */}
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
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
              />
              {titleErrorMessage && <span style={{ color: 'red' }}>{titleErrorMessage}</span>}
            </div>
            {/* <div>
              <label className="me-3" htmlFor="title">
                Code:{' '}
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
                id="title"
                value={cityCode}
                onChange={(e) => setCountryCode(e.target.value)}
              />
            </div> */}
          </div>
        </Modal>
      )}
    </>
  )
}
