import React from 'react'
import {
  CAvatar,
  CDropdown,
  CDropdownDivider,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CNavLink,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import avatar8 from './../../assets/images/avatars/8.jpg'
import { cilSettings, cilUser, cilAccountLogout, cilBell, cilEnvelopeOpen } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { logoutAction } from '../../redux/actions/userAction'

const AppHeaderDropdown = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate('/login')

  const handleLogout = async () => {
    try {
      await dispatch(logoutAction(navigate))
    } catch (error) {
      console.error('Logout failed:', error.message)
      toast.error('Logout failed. Please try again.')
    }
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
        <span className="ms-2">UserName</span>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <div className="d-flex">
          <CDropdownItem className="d-flex d-md-none">
            <CNavLink href="#">
              <CIcon icon={cilBell} size="lg" />
            </CNavLink>
          </CDropdownItem>
          <CDropdownItem className="d-flex d-md-none">
            <CNavLink href="#">
              <CIcon icon={cilEnvelopeOpen} size="lg" />
            </CNavLink>
          </CDropdownItem>
        </div>
        <CDropdownItem href="#">
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilSettings} className="me-2" />
          Settings
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem onClick={handleLogout}>
          <CIcon icon={cilAccountLogout} className="me-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
