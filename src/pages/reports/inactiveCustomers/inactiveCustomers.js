import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { CButton } from '@coreui/react'
import Table from '../../../components/table'
import Chart from '../../../components/chart'
import Modal from '../../../components/modal'
import styles from '../../../components/input.module.scss'
import { toast } from 'react-toastify'
import { axiosInstance } from '../../../axiosConfig'
import { useReactToPrint } from 'react-to-print'

export default function InactiveCustomers() {
  const [showChart, setShowChart] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  const navigate = useNavigate()
  const printRef = useRef()
  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  function handleChartClick() {
    setShowChart(true)
  }
  function handleReportsClick() {
    setShowChart(false)
    setShowModal(false)
  }
  return (
    <>
      <div className="m-4">
        <CButton
          onClick={handleReportsClick}
          className="mx-2"
          color={!showChart ? 'info' : 'secondary'}
        >
          Reports
        </CButton>
        <CButton onClick={handleChartClick} color={showChart ? 'info' : 'secondary'}>
          Chart
        </CButton>
      </div>

      {showChart ? (
        <div className="d-flex justify-content-center align-content-center w-100">
          <Chart
            showPie={false}
            path="/reports/inactive_customers?type=chart"
            chartName="inactive_users_profit_chart"
          />
        </div>
      ) : (
        <Table
          path="/reports/inactive_customers"
          ref={componentRef}
          printAction={handlePrint}
          showFilter={false}
          showDate={false}
          columns={[
            { name: 'ID', selector: (row) => row.id },
            { name: 'Name', selector: (row) => row.name },
            { name: 'Email', selector: (row) => row.email },
            { name: 'Phone', selector: (row) => row.phone },
            {
              name: 'Last Purchased Dated',
              selector: (row) => new Date(row.last_purchased_date).toLocaleDateString(),
            },
          ]}
          keys={['id', 'name', 'email', 'phone', 'last_purchased_date']}
          showActions={true}
          buttonNames={['Email']}
          actions={[() => setShowModal(true)]}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
      {showModal && (
        <Modal
          show={true}
          handleClose={() => {
            setShowModal(false)
            setMessage('')
            setSubject('')
          }}
          handleAction={async () => {
            try {
              await axiosInstance.post('/reports/coupon/mail')
              toast.success('Send Success!')
            } catch (error) {
              toast.error('Failed, Please Try Again!')
            }
          }}
          subject={subject}
          setSubject={setSubject}
          message={message}
          setMessage={setMessage}
        >
          <div className="w-50">
            <div>
              <h5>Send User An Email</h5>
            </div>
            <div className="d-flex align-items-center row m-3">
              <label htmlFor="subject">Subject: </label>
              <input
                id="subject"
                className={styles.inpt}
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
              <label htmlFor="message">Message: </label>
              <textarea
                id="message"
                className={`${styles.inpt} w-100`}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}
