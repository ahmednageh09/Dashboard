import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../axiosConfig'
import Table from '../../components/table'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Modal from '../../components/modal'
import ActionButton from '../../components/actionButton/actionButton'
import styles from '../../components/input.module.scss'
import Dropdown from 'react-bootstrap/Dropdown'

export default function Customers() {
  const [data, setData] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [approvedStatus, setApprovedStatus] = useState({})
  const [isBlocked, setIsBlocked] = useState({})
  const [addToGroupModal, setAddToGroupModal] = useState(false)
  const [createGroupModal, setCreateGroupModal] = useState(false)
  const [users, setUsers] = useState([])
  const [selectedUserIds, setSelectedUserIds] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () =>
      await axiosInstance
        .get('/customers')
        .then((response) => {
          setData(response.data)
        })
        .catch((error) => console.error('Error fetching data:', error))
    fetchData()
  }, [refresh])

  const handleStatus = async (id) => {
    try {
      await axiosInstance.post(`/active/user/${id}`)
      setApprovedStatus({
        ...approvedStatus,
        [id]: !approvedStatus[id],
      })
      setRefresh(!refresh)
      toast.success('Status updated successfully!')
    } catch (error) {
      console.error('Error approving comment:', error)
    }
  }
  const handleBlock = async (id) => {
    try {
      await axiosInstance.post(`customers/block/${id}`)
      setIsBlocked({
        ...isBlocked,
        [id]: !isBlocked[id],
      })
      setRefresh(!refresh)
      toast.success('Status updated successfully!')
    } catch (error) {
      console.error('Error approving comment:', error)
    }
  }
  const handleCreateGroup = () => {
    setCreateGroupModal(true)
  }
  const customerGroup = () => {
    setAddToGroupModal(true)
    // await axiosInstance.
  }
  const addNewUser = () => {
    navigate('/customer/create')
  }
  const getUsers = async () => {
    try {
      const fetchData = await axiosInstance.get('/user')
      setUsers(
        fetchData.data.data.map((e) => ({
          title: e.first_name,
          id: e.id,
        })),
      )
      console.log(
        fetchData.data.data.map((e) => ({
          title: e.first_name,
          id: e.id,
        })),
      )
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }
  const handleUserSelectChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value)
    setSelectedUserIds(selectedOptions)
  }

  return (
    <>
      <div>
        <div className="d-flex justify-content-evenly my-2">
          <div
            className="d-flex justify-content-between p-2 rounded-2 m-2 row"
            style={{ backgroundColor: 'white', borderTop: '4px solid #2eb85c' }}
          >
            <h4 className="text-center">All Customers</h4>
            <div className="text-center pt-2">{data.additional?.users_count}</div>
          </div>
          <div
            className="d-flex justify-content-between p-2 rounded-2 m-2 row"
            style={{ backgroundColor: 'white', borderTop: '4px solid #2eb85c' }}
          >
            <h4 className="text-center">Groups</h4>
            <div className="text-center pt-2">{data.additional?.groups.length}</div>
          </div>
          <div
            className="d-flex justify-content-between p-2 rounded-2 m-2 row"
            style={{ backgroundColor: 'white', borderTop: '4px solid #2eb85c' }}
            onClick={() => {
              handleCreateGroup()
              getUsers()
            }}
          >
            <h4 className="text-center">Create New Group</h4>
            <div
              style={{
                fontWeight: 'bolder',
                fontSize: '30px',
                color: 'green',
                textAlign: 'center',
              }}
            >
              +
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <ActionButton name="Add New User" onClick={() => addNewUser()} />
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              Filter
            </Dropdown.Toggle>
            <Dropdown.Menu align="end">
              <Dropdown.Item href="#">
                Groups
                <Dropdown.Menu style={{ display: 'none', left: '-10rem', top: '0.5rem' }}>
                  <Dropdown.Item>All Groups</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Item>
              <Dropdown.Item href="#">
                Gender
                <Dropdown.Menu style={{ display: 'none', left: '-10rem', top: '3rem' }}>
                  <Dropdown.Item href="#">All</Dropdown.Item>
                  <Dropdown.Item href="#">Male</Dropdown.Item>
                  <Dropdown.Item href="#">Female</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Item>
              <Dropdown.Item href="#">
                Filter By
                <Dropdown.Menu style={{ display: 'none', left: '-10rem', top: '4.5rem' }}>
                  <Dropdown.Item href="#">All Users</Dropdown.Item>
                  <Dropdown.Item href="#">Most Buy</Dropdown.Item>
                  <Dropdown.Item href="#">Least Buy</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Item>
              <Dropdown.Item href="#">
                Send
                <Dropdown.Menu style={{ display: 'none', left: '-10rem', top: '6rem' }}>
                  <Dropdown.Item href="#">Email</Dropdown.Item>
                  <Dropdown.Item href="#">SMS</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <Table
          key={refresh}
          path="/customers"
          showDate={false}
          showFilter={false}
          columns={[
            { name: 'ID', selector: (row) => row.id },
            {
              name: 'User Image',
              selector: (row) => (
                <img style={{ borderRadius: '50%', width: '3rem' }} src={row.image} alt="User" />
              ),
            },
            {
              name: 'Status',
              selector: (row) => (
                <button
                  type="button"
                  className={`btn ${row.status ? 'btn-success' : 'btn-secondary'}`}
                  onClick={() => handleStatus(row.id)}
                >
                  {row.status ? 'Active' : 'Not active'}
                </button>
              ),
            },
            { name: 'Phone Verified', selector: (row) => row.phone_verified_at },
            {
              name: 'Is blocked',
              selector: (row) => (
                <button
                  type="button"
                  className={`btn ${row.is_blocked ? 'btn-danger' : 'btn-success'}`}
                  onClick={() => handleBlock(row.id)}
                >
                  {row.is_blocked ? 'Blocked' : 'Not Blocked'}
                </button>
              ),
            },
          ]}
          keys={['id', 'image', 'status', 'phone_verified_at', 'is_blocked']}
          showActions={true}
          buttonNames={['View User', 'Add User To Group']}
          actions={[(row) => navigate(`/customers/orders/${row.id}`), () => customerGroup()]}
        />
        {/* Create New Group */}
        <Modal handleClose={() => setCreateGroupModal(false)} show={createGroupModal}>
          <div>
            <h4>Create a new group</h4>
            <div className="d-flex justify-content-around align-items-center row my-3">
              <input
                type="text"
                placeholder="Title"
                className={styles.inpt}
                style={{ width: '15rem' }}
              />
              <input type="file" className={styles.inpt} style={{ width: '15rem' }} />
              <select
                // multiple
                onChange={handleUserSelectChange}
                className={styles.inpt}
                style={{ width: '15rem' }}
              >
                {Array.isArray(users) &&
                  users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.title}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </Modal>
        {/* Add To Group */}
        <Modal handleClose={() => setAddToGroupModal(false)} show={addToGroupModal}>
          <div className="my-2">
            <select className={styles.inpt}>
              {data.additional &&
                data.additional.groups.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.title}
                  </option>
                ))}
            </select>
          </div>
        </Modal>
      </div>
    </>
  )
}
