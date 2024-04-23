import { axiosInstance } from '../axiosConfig'
import Cookies from 'universal-cookie'
import { toast } from '../axiosConfig'

const cookies = new Cookies()

export const loginService = async (email, password) => {
  try {
    const response = await axiosInstance.post('/login', {
      email: email,
      password: password,
    })

    // Set the token after successful login
    if (response && response.data.data.token) {
      cookies.set('token', response.data.data.token)
      toast.success('Login Successful', { toastId: 'sucessLogin' })
    } else {
      toast.warning('Wrong credentials, try again')
    }

    return response.data
  } catch (error) {
    throw error
  }
}

export const logoutService = () => {
  const token = cookies.get('token')
  axiosInstance
    .post(
      '/logout',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then(() => {
      cookies.remove('token')
      toast.success('Logout Successful')
    })
    .catch((error) => {
      if (error.response && error.response.status === 401) {
        toast.error('You are not authorized to logout!')
      }
    })
}
