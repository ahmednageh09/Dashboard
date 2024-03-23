import React, { useEffect, useState } from 'react'
import { CButton, CCard, CCardBody, CCardTitle } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import '../../components/sidebar/reportCard/reportCard.scss'
import { cilCash, cilCog, cilGift } from '@coreui/icons'
import { axiosInstance } from '../../axiosConfig'

export default function Offers() {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      let response = await axiosInstance.get('/offers/all')
      setData(response.data.data)
    }

    fetchData()
  }, [])

  return (
    <>
      <div className="d-flex justify-content-center row px-3">
        {data.map((offer, index) => (
          <CCard key={index} className="ccard">
            <CCardBody className="cbody">
              <CCardTitle>{offer.code}</CCardTitle>
              <CCardBody>{offer.title}</CCardBody>
              <CIcon className="cicon" icon={cilGift} size="3xl" />
            </CCardBody>
            <CCardBody>
              <CButton href={`/offers/${offer.code}`} className="clink">
                More Info
              </CButton>
            </CCardBody>
          </CCard>
        ))}
        <CCard className="ccard">
          <CCardBody className="cbody">
            <CCardTitle>Commissions</CCardTitle>
            <CIcon className="cicon" icon={cilCash} size="3xl" />
          </CCardBody>
          <CCardBody>
            <CButton href={'/offers/commission'} className="clink">
              More Info
            </CButton>
          </CCardBody>
        </CCard>
        <CCard className="ccard">
          <CCardBody className="cbody">
            <CCardTitle>Settings</CCardTitle>
            <CIcon className="cicon" icon={cilCog} size="3xl" />
          </CCardBody>
          <CCardBody>
            <CButton href={'/offers/settings'} className="clink">
              More Info
            </CButton>
          </CCardBody>
        </CCard>
      </div>
    </>
  )
}
