import React, { useEffect, useState } from 'react'
import styles from '../../components/input.module.scss'
import { useParams } from 'react-router-dom'
import { axiosInstance } from '../../axiosConfig'
import { toast } from 'react-toastify'
import Modal from 'src/components/modal'

export default function EditUser() {
  const [data, setData] = useState({})
  const [showModal, setShowModal] = useState(false)
  const user = useParams()
  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosInstance.get(`/user/${user.id}/edit`)
      const data = res.data.data[0]
      setData(data)
    }

    fetchData()
  }, [user.id])
  const updateUser = async () => {
    await axiosInstance
      .patch(
        `/user/${user.id}?name=${data.name}&lastname=${data.lastname}&phone=${data.phone}&email=${data.email}`,
      )
      .then((e) => {
        if (e.data.status === 'error') {
          toast.error(e.data.message)
        } else {
          toast.success('User updated successfully!')
        }
      })
      .catch((err) => {
        console.log({ error: err })
      })
  }
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'white',
          margin: '1rem',
          marginLeft: 'auto',
          marginRight: 'auto',
          padding: '1rem',
          borderRadius: '8px',
          width: 'fit-content',
          maxWidth: '40rem',
        }}
      >
        <h3>Edit User</h3>
        <div className="d-flex justify-content-around align-items-center row m-5">
          <div className="d-flex justify-content-center align-items-center">
            <label htmlFor="firstname">First name: </label>
            <input
              className={styles.inpt}
              style={{ backgroundColor: '#ebedef', width: '22rem' }}
              id="firstname"
              type="text"
              value={data.name}
              onChange={(e) => {
                setData((prev) => ({ ...prev, name: e.target.value }))
              }}
            />
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <label htmlFor="lastname">Last name: </label>
            <input
              className={styles.inpt}
              style={{ backgroundColor: '#ebedef', width: '22rem' }}
              id="lastname"
              type="text"
              value={data.lastname}
              onChange={(e) => {
                setData((prev) => ({ ...prev, lastname: e.target.value }))
              }}
            />
          </div>
          <div className="d-flex justify-content-center align-items-center gap-4">
            <label htmlFor="email">Email: </label>
            <input
              className={styles.inpt}
              style={{ backgroundColor: '#ebedef', width: '22rem' }}
              id="email"
              type="email"
              required
              value={data.email}
              onChange={(e) => {
                setData((prev) => ({ ...prev, email: e.target.value }))
              }}
            />
          </div>
          <div className="d-flex justify-content-center align-items-center gap-3">
            <label htmlFor="mobile">Mobile: </label>
            <input
              className={styles.inpt}
              style={{ backgroundColor: '#ebedef', width: '22rem' }}
              id="mobile"
              type="number"
              value={data.phone}
              onChange={(e) => {
                setData((prev) => ({ ...prev, phone: e.target.value }))
              }}
            />
          </div>
          <div className="d-flex justify-content-center align-items-center gap-4">
            <label htmlFor="role">Role:</label>
            <select
              id="role"
              className={styles.inpt}
              style={{ backgroundColor: '#ebedef', width: '22rem' }}
            >
              <option>select an option</option>
            </select>
          </div>
        </div>
        <div>
          <button className="btn btn-success m-3" onClick={updateUser}>
            Save
          </button>
          <button
            className="btn btn-info"
            onClick={() => {
              setShowModal(true)
            }}
          >
            Change Password
          </button>
        </div>
      </div>
      {/* Password Modal */}
      <Modal actionButtonTitle="Update" show={showModal} handleClose={() => setShowModal(false)}>
        <div className="my-3">
          <div>
            <label htmlFor="change">Change Password: </label>
            <input
              className={styles.inpt}
              style={{ backgroundColor: '#ebedef' }}
              id="change"
              type="password"
              onChange={(e) => {
                // setData((prev) => ({ ...prev, phone: e.target.value }))
              }}
            />
          </div>
          <div>
            <label htmlFor="confirm">Confirm Password: </label>
            <input
              className={styles.inpt}
              style={{ backgroundColor: '#ebedef' }}
              id="change"
              type="password"
              onChange={(e) => {
                // setData((prev) => ({ ...prev, phone: e.target.value }))
              }}
            />
          </div>
        </div>
      </Modal>
    </>
  )
}
