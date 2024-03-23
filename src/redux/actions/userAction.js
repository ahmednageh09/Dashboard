import { loginService, logoutService } from '../../services/userService'

export const loginAction = (userData, navigate) => async (dispatch) => {
  try {
    const { email, password } = userData
    const response = await loginService(email, password)
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: response,
    })

    if (response && response.data && response.data.token) {
      navigate('/dashboard')
    } else {
      throw new Error('Invalid response data or token')
    }
  } catch (error) {
    dispatch({
      type: 'LOGIN_FAILURE',
      payload: error.message,
    })
    navigate('/login')
  }
}

export const logoutAction = (navigate) => async (dispatch) => {
  try {
    logoutService()
    dispatch({
      type: 'LOGOUT',
    })
    navigate('/login')
  } catch (error) {
    console.error(error.message)
  }
}
