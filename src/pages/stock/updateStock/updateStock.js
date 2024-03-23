import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../../axiosConfig'
import { toast } from 'react-toastify'

export default function UpdateStock() {
  const [prodcut, setProduct] = useState(null)
  const [prodcuts, setProducts] = useState([])
  const [quntity, setQuntity] = useState('')
  const [details, setDetails] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get('/stocks')
        const data = res.data.data.map((s) => ({ title: s.title, id: s.product_id }))
        setProducts(data)
      } catch {
        toast.error('Something went wrong, please try later!')
      }
    }
    fetchData()
  }, [])

  const handleSave = async () => {
    if (!prodcut) {
      setErrorMessage('Please select a product.')
      return
    }

    try {
      const response = await axiosInstance.post('/stocks/change', {
        product_id: prodcut.id,
        quantity: quntity,
        details: details,
      })
      toast.success('Stock Updated Successfully!')
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong please try again!')
    }
  }

  return (
    <>
      <div className="d-flex justify-content-around">
        <div
          className="d-flex justify-content-around align-items-center row py-4 px-4 "
          style={{ backgroundColor: 'white', borderRadius: '10px', maxWidth: '36rem' }}
        >
          <div>
            <label htmlFor="product">Product Name:</label>
            <select
              className="d-flex sel"
              style={{
                backgroundColor: '#ebedef',
                maxWidth: '25rem',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                borderRadius: '10px',
                outLine: 'none',
                padding: '0.5rem',
                border: 'none',
              }}
              id="product"
              value={prodcut ? prodcut.title : ''}
              onChange={(e) => {
                setProduct(prodcuts.find((p) => p.title === e.target.value))
                setErrorMessage('')
              }}
            >
              <option>select Product</option>
              {prodcuts?.map((prodcut, index) => (
                <option style={{ backgroundColor: '#ebedef' }} key={index} value={prodcut.title}>
                  {prodcut.title}
                </option>
              ))}
            </select>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          </div>
          <div className="my-3">
            <label htmlFor="quntity">Quantity: </label>
            <input
              type="number"
              className="d-flex"
              style={{
                backgroundColor: '#ebedef',
                borderRadius: '10px',
                outLine: 'none',
                padding: '0.5rem',
                border: 'none',
              }}
              id="quntity"
              value={quntity}
              onChange={(e) => setQuntity(e.target.value)}
            />
          </div>
          <div className="d-flex row">
            <label htmlFor="desc">Description:</label>
            <textarea
              style={{
                backgroundColor: '#ebedef',
                padding: '0.5rem',
                outline: 'none',
                border: 'none',
                borderRadius: '10px',
                maxWidth: '35rem',
                height: '5rem',
              }}
              id="desc"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
          </div>
          <button className="btn btn-success w-25 my-4" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </>
  )
}
