import React, { useEffect, useState } from 'react'
import styles from '../../components/input.module.scss'
import { axiosInstance } from '../../axiosConfig'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function CreateUser() {
  const navigate = useNavigate()

  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState('')
  const [passwordError, setPasswordError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosInstance.get('/countries/filter-by-status')
      setCountries(
        res.data.data.map((ele) => ({
          title: ele.title,
          id: ele.id,
        })),
      )
    }
    fetchData()
  }, [])
  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value)
  }
  const handleAddUser = () => {
    const password = document.getElementById('pass').value
    const confirmPassword = document.getElementById('confirmPass').value

    // Check if passwords match and are more than  6 characters
    if (password !== confirmPassword || password.length < 6) {
      setPasswordError('*Password must match confirm password & be at least  6 characters.')
      return
    }

    setPasswordError('')
    axiosInstance
      .post('/customer/store', {
        name: document.getElementById('firstname').value,
        lastname: document.getElementById('lastname').value,
        email: document.getElementById('email').value,
        country: document.getElementById('country').value,
        gender: document.getElementById('gender').value,
        phone: document.getElementById('mobile').value,
        password: document.getElementById('pass').value,
        password_confirmation: document.getElementById('confirmPass').value,
      })
      .then((res) => {
        if (res.data.message === 'Added Successfully !') {
          toast.success('New User added successfully')
          navigate('/customers')
        } else {
          toast.info(res.data.message)
        }
      })
  }
  return (
    <>
      <div className="d-flex justify-content-around align-items-center row m-2 bg-white p-5 rounded-4">
        <label htmlFor="firstname">First name : </label>
        <input
          className={styles.inpt}
          style={{ width: '33rem', backgroundColor: '#ebedef' }}
          id="firstname"
          type="string"
        />
        <label htmlFor="lastname">Last name : </label>
        <input
          className={styles.inpt}
          style={{ width: '33rem', backgroundColor: '#ebedef' }}
          id="lastname"
          type="string"
        />
        <label htmlFor="email">Email : </label>
        <input
          className={styles.inpt}
          style={{ width: '33rem', backgroundColor: '#ebedef' }}
          id="email"
          type="email"
          required
        />
        <label htmlFor="mobile">Mobile : </label>
        <input
          className={styles.inpt}
          style={{ width: '33rem', backgroundColor: '#ebedef' }}
          id="mobile"
          type="string"
        />
        <label htmlFor="gender">Gender :</label>
        <select
          id="gender"
          className={styles.inpt}
          style={{ width: '33rem', backgroundColor: '#ebedef' }}
        >
          <option selected>Selet an option</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <label htmlFor="country">Country :</label>
        <select
          id="country"
          className={styles.inpt}
          style={{ width: '33rem', backgroundColor: '#ebedef' }}
          onChange={handleCountryChange}
        >
          <option selected hidden>
            Select a country...
          </option>
          {countries.map((country, index) => (
            <option key={index} value={country.id}>
              {country.title}
            </option>
          ))}
        </select>
        <label htmlFor="pass">password : </label>
        <input
          className={styles.inpt}
          style={{ width: '33rem', backgroundColor: '#ebedef' }}
          id="pass"
          type="password"
          required
        />
        <div style={{ color: 'red', fontSize: '13px', textAlign: 'center' }}>{passwordError}</div>
        <label htmlFor="confirmPass">Confirm password : </label>
        <input
          className={styles.inpt}
          style={{ width: '33rem', backgroundColor: '#ebedef' }}
          id="confirmPass"
          type="password"
          required
        />
        <div>
          <button className="btn btn-success my-3" onClick={handleAddUser}>
            Add
          </button>
        </div>
      </div>
    </>
  )
}
