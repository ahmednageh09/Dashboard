import React from 'react'
import { CButton, CCard, CCardBody, CCardTitle } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import './reportCard.scss'
import PropTypes from 'prop-types'
import { cilChart } from '@coreui/icons'
import { Link } from 'react-router-dom'

ReportCard.propTypes = {
  title: PropTypes.string,
  path: PropTypes.string,
}

export default function ReportCard({ title, path }) {
  return (
    <>
      <CCard className="ccard">
        <CCardBody className="cbody">
          <CCardTitle>{title}</CCardTitle>
          <CIcon className="cicon" icon={cilChart} size="3xl" />
        </CCardBody>
        <CCardBody>
          <Link to={path} className="clink">
            <CButton className="btn btn-info">More Info</CButton>
          </Link>
        </CCardBody>
      </CCard>
    </>
  )
}
