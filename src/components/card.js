import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCardText } from '@coreui/react'
import PropTypes from 'prop-types'
import { axiosInstance } from '../axiosConfig'
export default function Card({ indices, path }) {
  Card.propTypes = {
    indices: PropTypes.arrayOf(PropTypes.string).isRequired,
    path: PropTypes.string,
  }

  const [values, setValues] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        let responses = await Promise.all(
          indices.map(async (index) => {
            let response = await axiosInstance.get(path)
            return response.data.data[index].value
          }),
        )

        setValues(responses)
      } catch {
        console.log(`Failed to load data`)
      }
    }

    fetchData()
  }, [indices, path])

  return (
    <>
      {values.map((value, index) => (
        <CCard
          textColor="#000000"
          className="mb-3 border-top-#303c54 border-top-4"
          style={{ maxWidth: '22rem', height: '7rem' }}
          key={index}
        >
          <CCardHeader style={{ fontWeight: 'bold' }}>{indices[index]}</CCardHeader>
          <CCardBody style={{ fontWeight: 'bold', color: 'blue', textAlign: 'center' }}>
            <CCardText>{value}</CCardText>
          </CCardBody>
        </CCard>
      ))}
    </>
  )
}
