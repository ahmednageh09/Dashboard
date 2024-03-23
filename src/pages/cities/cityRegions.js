import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { axiosInstance } from '../../axiosConfig'
import { toast } from 'react-toastify'
import Table from '../../components/table'

export default function CityRegions() {
  const { id: cityId } = useParams()
  const [data, setData] = useState([])
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    axiosInstance
      .get(`/city/show/regions?city_id=${cityId}`)
      .then((response) => setData(response.data))
      .catch((error) => console.error('Error fetching data:', error))
  }, [cityId, refresh])

  const handleDeleteRegion = (id) => {
    axiosInstance
      .delete(`/city/region/${id}/delete`)
      .then(() => {
        setRefresh(!refresh)
        toast.success('Region deleted successfully!')
      })
      .catch((error) => {
        console.error('Error deleting region:', error)
        toast.error('Failed to delete region. Please try again.')
      })
  }

  return (
    <>
      <Table
        key={refresh}
        path={`/city/show/regions?city_id=${cityId}`}
        showDate={false}
        showFilter={false}
        columns={[
          { name: 'ID', selector: (row) => row.id },
          { name: 'City Name', selector: (row) => row.city_name },
          { name: 'Region Name', selector: (row) => row.region_name },
          { name: 'Created At', selector: (row) => new Date(row.created_at).toLocaleDateString() },
        ]}
        keys={['id', 'city_name', 'region_name', 'created_at']}
        showActions={true}
        buttonNames={['Delete', 'Language']}
        actions={[(row) => handleDeleteRegion(row.id)]}
      />
    </>
  )
}
