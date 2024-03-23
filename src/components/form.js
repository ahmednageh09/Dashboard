import React from 'react'
import { CButton, CForm, CFormInput, CFormSelect } from '@coreui/react'
import PropTypes from 'prop-types'
import { axiosInstance } from '../axiosConfig'
import { toast } from 'react-toastify'

export default function Form({ values, setValues, method, path }) {
  Form.propTypes = {
    values: PropTypes.object,
    setValues: PropTypes.func,
    method: PropTypes.string,
    path: PropTypes.string,
  }
  const handleFieldChange = (event) => {
    const { name, value } = event.target
    setValues((prevValues) => ({
      ...prevValues,
      user: {
        ...prevValues.user,
        [name]: value,
      },
    }))
  }

  const handleClick = async () => {
    try {
      let response

      switch (method) {
        case 'GET':
          response = await axiosInstance.get(path)
          break
        case 'POST':
          response = await axiosInstance.post(path, values)
          break
        case 'PUT':
          response = await axiosInstance.put(path, values)
          break
        case 'PATCH':
          response = await axiosInstance.patch(path, values)
          break
        default:
          throw new Error(`Invalid method ${method}`)
      }
      const data = response.data
      const status = response.data.status
      if (status === 'success') {
        toast.success('Updated Success!')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error)
    }
  }

  return (
    <>
      <CForm className="d-flex flex-column ">
        <CFormInput
          type="text"
          name="name"
          value={values.name}
          label="First Name"
          onChange={handleFieldChange}
        />
        <CFormInput
          type="text"
          name="lastname"
          value={values.lastname}
          label="Last Name"
          onChange={handleFieldChange}
        />
        <CFormInput
          type="email"
          name="email"
          value={values.email}
          label="Email"
          onChange={handleFieldChange}
        />
        <CFormInput
          type="text"
          name="phone"
          value={values.phone}
          label="Phone"
          onChange={handleFieldChange}
        />
        <CFormSelect
          label="Group"
          options={[
            'Select Group',
            { label: 'One', value: '1' },
            { label: 'Two', value: '2' },
            { label: 'Three', value: '3' },
          ]}
        />
        <div className="m-3">
          <CButton onClick={handleClick} className="mx-2">
            Save Changes
          </CButton>
        </div>
      </CForm>
    </>
  )
}
