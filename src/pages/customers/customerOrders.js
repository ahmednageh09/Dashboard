import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { axiosInstance } from '../../axiosConfig'
import Modal from 'src/components/modal'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function CustomerOrders() {
  const user = useParams()
  const [userInfo, setUserInfo] = useState({ orders: [], user: {} })
  const [showModal, setShowModal] = useState(false)
  const [message, setMessage] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(`customers/${user.id}/orders`)
        const userData = res.data.data
        setUserInfo(userData)
      } catch (err) {
        console.log('Error in fetching data', err)
      }
    }
    fetchData()
  }, [user.id])
  function formatPhoneNumber(phoneNumber) {
    if (!phoneNumber || typeof phoneNumber !== 'string') {
      return 'User has no phone number yet'
    }

    // Remove all non-numeric characters
    const numericPhone = phoneNumber.replace(/\D/g, '')
    if (numericPhone.length <= 4) {
      return numericPhone
    }
    const visibleDigits = numericPhone.slice(-4)
    const hiddenDigits = '*'.repeat(numericPhone.length - 4)
    return hiddenDigits + visibleDigits
  }
  const handleSelectChange = (event) => {
    const selectedOption = event.target.value
    if (selectedOption === 'sendSms') {
      setShowModal(true)
    } else if (selectedOption === 'edit') {
      navigate(`/customers/editUser/${user.id}`)
    } else if (selectedOption === 'delete') {
      try {
        axiosInstance
          .delete(`/customers/${user.id}/delete`)
          .then(toast.success('User deleted successfully!'), navigate('/customers'))
      } catch (err) {
        console.log(err)
      }
    } else {
      setShowModal(false)
    }
  }

  return (
    <>
      <div>
        <div
          className="d-flex justify-content-between row rounded-2 m-3"
          style={{ backgroundColor: 'white' }}
        >
          <div className="d-flex justify-content-between">
            <h3 className="my-2">Customer</h3>
            <select
              style={{
                outline: 'none',
                border: 'none',
                borderRadius: '8px',
                backgroundColor: '#ebedef',
                margin: '8px',
                padding: '5px',
              }}
              onChange={handleSelectChange}
            >
              <option hidden selected>
                Choose an action
              </option>
              <option hidden>Choose an action</option>
              <option value="sendSms">Send SMS</option>
              <option value="edit">Edit</option>
              <option value="block">Block</option>
              <option value="delete">Delete</option>
            </select>
          </div>
          <hr />
          <Modal
            show={showModal}
            actionButtonTitle="Send"
            handleClose={() => setShowModal(false)}
            handleAction={async () => {
              await axiosInstance.post(`/store_user/${user.id}/sendSMS?message=${message}`)
            }}
          >
            <input
              style={{
                margin: '1rem',
                border: 'none',
                outline: 'none',
                borderRadius: '8px',
                padding: '1rem',
              }}
              placeholder="Enter message here..."
              onChange={(e) => setMessage(e.target.value)}
            />
          </Modal>
          <h5>Name: {userInfo.user.name}</h5>
          <div className="d-flex justify-content-around my-2">
            <img
              style={{ borderRadius: '50%', objectFit: 'center' }}
              src={userInfo.user.image}
              alt="user"
            />
            <div>Phone: {formatPhoneNumber(userInfo.user.phone)}</div>
          </div>
        </div>
        <div className="rounded-2 p-3 m-3" style={{ backgroundColor: 'white' }}>
          <h5>Orders</h5>
          <hr />
          {userInfo.orders.length === 0 ? (
            <p className="text-center">No orders yet</p>
          ) : (
            userInfo.orders.map((order) => (
              <React.Fragment key={order.id}>
                <div className="d-flex justify-content-between align-items-center mx-2">
                  <div>
                    Order number :
                    <span className="bg-success rounded-2 p-1 m-2">{order.ordernumber}</span>
                  </div>
                  <div>
                    Total : <span className="bg-success rounded-2 p-1 m-2">{order.total}</span>
                  </div>
                  <div>
                    Status : <span className="bg-success rounded-2 p-1 m-2">{order.status}</span>
                  </div>
                </div>
                <hr />
              </React.Fragment>
            ))
          )}
        </div>
      </div>
    </>
  )
}
