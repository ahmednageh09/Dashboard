import React, { useEffect, useState } from 'react'
import { axiosInstance } from 'src/axiosConfig'
import { toast } from '../../axiosConfig'
import { useParams } from 'react-router-dom'
import Table from '../../components/table'

export default function CountryCities() {
  const { id: cityId } = useParams()
  const [data, setData] = useState([])
  const [refresh, setRefresh] = useState(false)
  useEffect(() => {
    axiosInstance
      .get(`/country/cities?country_id=${cityId}`)
      .then((response) => setData(response.data))
      .catch((error) => console.error('Error fetching data:', error))
  }, [refresh, cityId])
  const handleDeleteCity = (id) => {
    axiosInstance
      .delete(`/country/cities/delete/${id}`)
      .then(() => {
        setRefresh(!refresh)
        toast.success('City deleted successfully!')
      })
      .catch((error) => {
        console.error('Error deleting city:', error)
        toast.error('Failed to delete city. Please try again.')
      })
  }
  return (
    <>
      <Table
        key={refresh}
        path={`/country/cities?country_id=${cityId}`}
        showDate={false}
        showFilter={false}
        columns={[
          { name: 'ID', selector: (row) => row.id },
          { name: 'Title', selector: (row) => row.title },
          { name: 'Status', selector: (row) => row.status },
          { name: 'Created At', selector: (row) => new Date(row.created_at).toLocaleDateString() },
        ]}
        keys={['id', 'title', 'status', 'created_at']}
        showActions={true}
        buttonNames={['Delete', 'Language']}
        actions={[(row) => handleDeleteCity(row.id)]}
      />
    </>
  )
}
