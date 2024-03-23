import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import img from '../../../assets/images/avatars/2.jpg'
import Table from 'react-bootstrap/Table'
import { axiosInstance } from '../../../axiosConfig'

export default function Details() {
  const { id } = useParams()
  const [newData, setNewData] = useState(null)
  const [order, setOrder] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosInstance.get(`/reports/refund/${id}`)
      const newData = res.data
      const order = res.data.additional.orders
      console.log(newData)
      console.log(order)
      setNewData(newData)
      setOrder(order)
    }
    fetchData()
  }, [id])

  return (
    <>
      <div className="d-flex justify-content-evenly">
        <div className="card" style={{ width: '18rem' }}>
          <div className="d-flex justify-content-center">
            <img
              src={img}
              style={{
                width: '7rem',
                objectFit: 'fit-content',
                borderRadius: '50%',
                margin: '1rem',
              }}
              alt="User Image"
            />
          </div>
          <div className="card-body">
            <div className="d-flex justify-content-center flex-column">
              <h5 className="card-title">{newData ? newData.data.name : 'Loading...'}</h5>
            </div>
            <div>
              <ul>
                <li>
                  <span style={{ fontWeight: 'bold' }}>Email: </span>
                  {newData ? newData.data.email : 'Loading...'}
                </li>
                <li>
                  <span style={{ fontWeight: 'bold' }}>Phone: </span>
                  {newData ? newData.data.phone : 'Loading...'}
                </li>
                <li>
                  <span style={{ fontWeight: 'bold' }}>Balance: </span>{' '}
                  {newData ? newData.data.balance : 'Loading...'}
                </li>
                <li>
                  <span style={{ fontWeight: 'bold' }}>Points: </span>
                  {newData ? newData.data.points : 'Loading...'}
                </li>
                <li>
                  <span style={{ fontWeight: 'bold' }}>Gender: </span>
                  {newData ? newData.data.gender : 'Loading...'}
                </li>
                <li>
                  <span style={{ fontWeight: 'bold' }}>Refund Count: </span>
                  {newData ? newData.additional.countStatusRefund : 'Loading...'}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="m-4 p-3 w-50">
          <Table striped bordered hover responsive>
            <thead style={{ whiteSpace: 'normal', backgroundColor: 'GrayText' }}>
              <tr>
                <th>ID</th>
                <th>Status</th>
                <th>Reason</th>
                <th>Order Number</th>
                <th>Refund Date</th>
              </tr>
            </thead>
            <tbody>
              {order &&
                order.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.title}</td>
                    <td>{order.comment}</td>
                    <td>{order.ordernumber}</td>
                    <td>{order.refund_date}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  )
}
