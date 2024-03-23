import React, { useEffect, useState } from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CCardText } from '@coreui/react'
import PropTypes from 'prop-types'
import { axiosInstance } from '../../../axiosConfig'
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import Form from '../../../components/form'

export default function FinancialCard({ indices, path }) {
  //define props
  FinancialCard.propTypes = {
    indices: PropTypes.arrayOf(PropTypes.string),
    path: PropTypes.string,
  }
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const transactionId = searchParams.get('id')

  const [values, setValues] = useState({})
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axiosInstance.get(path)

        const extractedValues = indices.reduce((acc, index) => {
          const res = response.data.data[index]
          return { ...acc, [index]: res }
        }, {})

        setValues(extractedValues)
      } catch (error) {
        console.error('Failed to load data:', error)
      }
    }

    fetchData()
  }, [indices, path])

  const formatDateTime = (dateTimeString) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }
    return new Date(dateTimeString).toLocaleString('en-US', options)
  }
  // for accepting transaction
  const handleAccept = async () => {
    try {
      // Accept the transaction
      const response = await axiosInstance.get(`/orders/offline/${transactionId}/accept`)
      const message = response.data.message
      setValues((prevValues) => ({
        ...prevValues,
        transaction: {
          ...prevValues.transaction,
          status: 'paid',
        },
      }))

      toast.success(message)
    } catch (error) {
      toast.error(error)
    }
  }

  // handle transaction refuse button
  const handleRefuse = async () => {
    try {
      // Accept the transaction
      const response = await axiosInstance.get(`/orders/offline/${transactionId}/refused`)
      const message = response.data.message
      setValues((prevValues) => ({
        ...prevValues,
        transaction: {
          ...prevValues.transaction,
          status: 'refused',
        },
      }))

      toast.success(message)
    } catch (error) {
      toast.error(error)
    }
  }

  // edit user info

  let params = new URLSearchParams()
  const editUser = async () => {
    setShowForm(true)
    const res = await axiosInstance.get(`user/${values.user.id}/edit`)
    const data = res.data.data[0]

    // Set the initial form values
    setValues({
      user: {
        _method: 'PATCH',
        id: values.user.id,
        name: data.firstName,
        lastname: data.lastName,
        phone: data.phone,
        email: data.email,
      },
    })
  }

  return (
    <>
      {!showForm ? (
        <div className="row d-flex justify-content-evenly ">
          <CCard style={{ margin: '1rem', maxWidth: '40rem', height: 'fit-content' }}>
            <CCardHeader>
              <h3>Transaction Details</h3>
            </CCardHeader>
            <CCardBody>
              <CCardText>
                <ul>
                  <li>
                    <strong>Transaction Type:</strong> {values.transaction_type?.method}
                  </li>
                  <li>
                    <strong>Transaction ID:</strong> {values.transaction_type?.id}
                  </li>
                  <li>
                    <strong>Total:</strong> {values.transaction?.total}
                  </li>
                  <li>
                    <strong>Created At:</strong> {formatDateTime(values.transaction?.created_at)}
                  </li>
                  <hr />
                  <li>
                    <strong>Status:</strong>{' '}
                    <span
                      style={{
                        padding: '3px',
                        borderRadius: '8px',
                        backgroundColor:
                          values.transaction?.status === 'pending'
                            ? 'yellow'
                            : values.transaction?.status === 'paid'
                              ? '#2eb85c'
                              : '#dd4b39',
                      }}
                    >
                      {values.transaction?.status}
                    </span>
                  </li>
                </ul>
                {values.transaction?.status === 'pending' && (
                  <div>
                    <CButton className="mx-1" color="success" onClick={handleAccept}>
                      Accept
                    </CButton>
                    <CButton className="ml-2" color="danger" onClick={handleRefuse}>
                      Refuse
                    </CButton>
                  </div>
                )}
              </CCardText>
            </CCardBody>
          </CCard>
          <CCard style={{ margin: '1rem', maxWidth: '40rem', height: 'fit-content' }}>
            <CCardHeader>
              <h3>Customer Details</h3>
            </CCardHeader>
            <CCardBody>
              <CCardText>
                <ul>
                  <li>
                    <strong>First Name:</strong> {values.user?.name}
                  </li>
                  <li>
                    <strong>Last Name:</strong> {values.user?.lastname}
                  </li>
                  <li>
                    <strong>Email:</strong> {values.user?.email}
                  </li>
                  <li>
                    <strong>Phone:</strong> {values.user?.phone}
                  </li>
                  <li>
                    <strong>Balance:</strong> {values.user?.balance}
                  </li>
                  <li>
                    <strong>Order.No:</strong> {values.order?.order_id}
                  </li>
                  <hr />
                  <li>
                    <strong>User Status:</strong>{' '}
                    <span
                      style={{
                        padding: '3px',
                        borderRadius: '8px',
                        backgroundColor: values.user?.status === 'inactive' ? 'yellow' : '#2eb85c',
                      }}
                    >
                      {values.user?.status}
                    </span>
                  </li>
                </ul>
                <CButton className="mx-1" color="light" onClick={editUser}>
                  Edit
                </CButton>
              </CCardText>
            </CCardBody>
          </CCard>
        </div>
      ) : (
        <Form
          values={values.user}
          setValues={setValues}
          method={'POST'}
          path={`/user/${values.user.id}?${params.toString()}`}
        />
      )}
    </>
  )
}
