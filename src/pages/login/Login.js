import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { loginAction } from '../../redux/actions/userAction'

import cookies from 'universal-cookie'
const cookie = new cookies()

const Login = () => {
  const navigate = useNavigate('/login')

  const [email, setEmail] = useState('admin@serv5.com')
  const [password, setPassword] = useState('123456')
  const [emailTouched, setEmailTouched] = useState(false)
  const [passwordTouched, setPasswordTouched] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const dispatch = useDispatch()
  const userStatus = useSelector((state) => state.isAuthenticated)

  useEffect(() => {
    setIsButtonDisabled(!(email && password))
  }, [email, password])

  useEffect(() => {
    if (emailTouched && !email) {
      setEmailError('Email is required')
    } else {
      setEmailError('')
    }
    if (passwordTouched && !password) {
      setPasswordError('Password is required')
    } else {
      setPasswordError('')
    }
  }, [email, password, emailTouched, passwordTouched])

  const signIn = async (e) => {
    e.preventDefault()
    try {
      const userData = { email, password }
      await dispatch(loginAction(userData, navigate))
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCard className="p-4">
              <CCardBody>
                <CForm>
                  <h1>Login</h1>
                  <p className="text-medium-emphasis">Sign In to your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="admin@admin.com"
                      autoComplete="username"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={() => setEmailTouched(true)}
                      className={emailError ? 'is-invalid' : ''}
                    />
                    {emailError && <div className="invalid-feedback">{emailError}</div>}
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="******"
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onBlur={() => setPasswordTouched(true)}
                      className={passwordError ? 'is-invalid' : ''}
                    />
                    {passwordError && <div className="invalid-feedback">{passwordError}</div>}
                  </CInputGroup>
                  <CRow>
                    <CCol xs={6}>
                      <CButton
                        color="primary"
                        className="px-4"
                        onClick={signIn}
                        disabled={isButtonDisabled}
                      >
                        Login
                      </CButton>
                    </CCol>
                    <CCol xs={6} className="text-right">
                      <CButton color="link" className="px-0">
                        <Link to="/forgetPassword">Forgot password?</Link>
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
