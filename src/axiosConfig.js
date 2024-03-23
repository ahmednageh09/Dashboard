import axios from 'axios'
import Cookies from 'universal-cookie'
import { toast } from 'react-toastify'

const cookies = new Cookies()

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  // timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    lang: 'en',
  },
})

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = cookies.get('token')
    const isLoginOrLogoutEndpoint = ['/login', '/logout'].includes(config.url)

    if (token && !isLoginOrLogoutEndpoint) {
      config.headers['Authorization'] = `Bearer ${token}`
    } else if (isLoginOrLogoutEndpoint) {
      if (config.url === '/logout' && token) {
        // Allow logout request to proceed with a token
      } else if (config.url === '/login' && !token) {
        // Allow login request to proceed without a token
      }
    } else {
      // Redirect to login and show error toast for all other unauthorized requests
      window.location.href = '/login'
      toast.error('You are not authorized, please try again!')
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = '/login'
      toast.error('Session expired. Please log in again.')
    }
    return Promise.reject(error)
  },
)

export { axiosInstance, toast }
