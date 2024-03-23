import React, { useEffect, useState } from 'react'
import Styles from '../../components/input.module.scss'
import { axiosInstance } from 'src/axiosConfig'
import { useParams, useNavigate } from 'react-router-dom'

export default function Edit() {
  const [data, setData] = useState()
  const navigate = useNavigate()
  const order = useParams()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(`/orders/${order.id}/edit`)
        const data = res.data.data
        console.log(data)
        setData(data)
      } catch {}
    }
    fetchData()
  }, [])
  return (
    <>
      <div className="d-flex justify-content-center gap-2 align-items-center row">
        <h3>Edit Page</h3>
        {/* first info */}
        <div
          className="d-flex justify-content-center flex-wrap align-items-center bg-white rounded-2 p-3  my-2 gap-3"
          style={{ width: 'fit-content' }}
        >
          <div>
            <label htmlFor="orderNo">Order No : </label>
            <input
              type="text"
              id="orderNo"
              className={Styles.inpt}
              value={data?.order.ordernumber}
            />
          </div>
          <div>
            <label htmlFor="transNo" style={{ whiteSpace: 'noWrap' }}>
              Transaction No :
            </label>
            <input
              type="button"
              id="transNo"
              value={data?.transactions.id}
              className="btn text-success"
              onClick={() =>
                navigate(`/orders/financial_transactions/details/${data?.transactions.id}`)
              }
            />
          </div>
          <div>
            <label htmlFor="date">Date : </label>
            <input
              type="date"
              id="date"
              className={Styles.inpt}
              value={
                data?.transactions.created_at
                  ? new Intl.DateTimeFormat('en-CA').format(new Date(data?.transactions.created_at))
                  : ''
              }
            />
          </div>
          <div>
            <label htmlFor="orderStatus" style={{ whiteSpace: 'noWrap' }}>
              Order Status :
            </label>
            <input
              type="button"
              id="orderStatus"
              value={data?.order.status}
              className="btn text-success"
            />
          </div>
          <div>
            <label htmlFor="print">Print : </label>
          </div>
        </div>
        {/* seconed info */}
        <div className="d-flex justify-content-center gap-5 flex-wrap">
          <div className="d-flex bg-white rounded-2 p-3 row" style={{ width: '20rem' }}>
            <div className="d-flex justify-content-center gap-5 align-items-center m-2">
              <h6>Client</h6>
              <button className="btn btn-info">Edit</button>
            </div>
            <hr />
            <div className="d-flex justify-content-around row">
              <div>
                <label htmlFor="user">User : </label>
                <input
                  id="user"
                  type="text"
                  className={Styles.inpt}
                  style={{ width: '8rem', marginLeft: '1.1rem' }}
                  value={`${data?.order.user.name}${' '}${data?.order.user.lastname}`}
                />
              </div>
              <div>
                <label htmlFor="phone">Phone : </label>
                <input
                  id="phone"
                  type="text"
                  className={Styles.inpt}
                  style={{ width: '8rem' }}
                  value={data?.order.user.phone}
                />
              </div>
            </div>
          </div>

          <div className="d-flex bg-white rounded-2 p-3 row" style={{ width: '20rem' }}>
            <div className="d-flex justify-content-center gap-5 align-items-center m-2">
              <h6>Shipping</h6>
              <button className="btn btn-info">Edit</button>
            </div>
            <hr />
            <div className="d-flex justify-content-around row">
              <label htmlFor="country">Country / City : </label>
              <input
                id="country"
                type="text"
                className={Styles.inpt}
                value={data?.address.country.data.title}
              />
              <label htmlFor="address">Address : </label>
              <input
                id="address"
                type="text"
                className={Styles.inpt}
                value={`${data?.address.Neighborhood}${', '}${data?.address.street} ${', '} ${data?.address.address}`}
              />
              <label htmlFor="code">Postal Code : </label>
              <input id="code" type="text" className={Styles.inpt} value={data?.address.code} />
            </div>
          </div>

          <div className="d-flex bg-white rounded-2 p-3 row" style={{ width: '20rem' }}>
            <div className="d-flex justify-content-center gap-5 align-items-center m-2">
              <h6>Payment Method</h6>
              <button className="btn btn-info">Edit</button>
            </div>
            <hr />
            <div className="d-flex justify-content-around row">
              <label htmlFor="method">Method : </label>
              <input
                id="method"
                type="text"
                className={Styles.inpt}
                style={{ width: '8rem' }}
                value={data?.payment_method}
              />
              <label htmlFor="status">Status : </label>
              <input
                id="status"
                type="text"
                className={Styles.inpt}
                style={{ width: '8rem' }}
                value={data?.payment_status}
              />
            </div>
          </div>
        </div>
        {/* third info */}
        <div className="d-flex justify-content-center my-3 row bg-white p-3 rounded text-white fw-bold">
          <h5
            style={{
              width: '11rem',
              backgroundColor: '#6f30a0',
              textAlign: 'center',
              color: 'white',
              padding: '0.2rem',
              borderRadius: '1rem',
            }}
          >
            Order Status
          </h5>

          <table style={{ color: 'black', textAlign: 'center' }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Status</th>
                <th>Description</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(data?.order_tracks) ? (
                data?.order_tracks.map((item) => (
                  <tr key={item.id} style={{ borderBottom: '.4px solid', padding: '5rem' }}>
                    <td>{item.id}</td>
                    <td>{item.Status} </td>
                    <td>{item.description}</td>
                    <td>{new Date(item.date).toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No order tracks available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Fourth info */}
        <div className="d-flex justify-content-center row overflow-auto flex-wrap align-items-center bg-white rounded-2 p-3 my-2">
          <h5>Products</h5>
          <hr />
          <div className="d-flex justify-content-center align-items-center row">
            <div className="d-flex justify-content-center my-3 row">
              <h5
                style={{
                  width: '11rem',
                  backgroundColor: '#6f30a0',
                  textAlign: 'center',
                  color: 'white',
                  padding: '0.2rem',
                  borderRadius: '1rem',
                }}
              >
                Order Details
              </h5>

              <table>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Total Price</th>
                    <th>Vat</th>
                    <th>Vat Value</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.order_products.data.map((item) => (
                    <tr key={item.id} style={{ borderBottom: '.4px solid', padding: '5rem' }}>
                      <td>
                        <img
                          className={{
                            outLine: 'none',
                            border: '1px solid',
                            borderRadius: '50%',
                            width: 'fit-content',
                          }}
                          src={item.thumbnail_img}
                          alt="product"
                        />
                      </td>
                      <td>
                        {item.total_prices.toFixed(2)} {data.currency}
                      </td>
                      <td style={{ color: 'red' }}>{item.vat} %</td>
                      <td>
                        {item.vatVal} {data.currency}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="d-flex justify-content-center row">
              <h5
                style={{
                  width: '11rem',
                  backgroundColor: '#6f30a0',
                  textAlign: 'center',
                  color: 'white',
                  padding: '0.2rem',
                  borderRadius: '1rem',
                }}
              >
                Payment Details
              </h5>
              <div className="d-flex justify-content-around align-items-center row">
                <label htmlFor="subTotal">Sub Total : </label>
                <input
                  id="subTotal"
                  value={data?.order_products.data[0].final_total}
                  className={Styles.inpt}
                />
                <label htmlFor="vat">Vat : </label>
                <input id="vat" value={data?.order_products.vatFinal} className={Styles.inpt} />
                <label htmlFor="shipping">Shipping Cost : </label>
                <input id="shipping" value={data?.order.shipping_cost} className={Styles.inpt} />
                <label htmlFor="total"> Total : </label>
                <input id="total" value={data?.order.total} className={Styles.inpt} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
