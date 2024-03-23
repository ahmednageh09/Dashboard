import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilEnvelopeOpen, cilMenu } from '@coreui/icons'

import AppHeaderDropdown from './AppHeaderDropdown'
import logo from '../../assets/images/soinLogo.png'
import sidebarAction from '../../../src/redux/actions/sidebarAction'
import langAction from '../../../src/redux/actions/langAction'

const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebar.sidebarShow)
  const lang = useSelector((state) => state.lang?.lang)
  const handleChange = () => {
    dispatch(sidebarAction(!sidebarShow))
  }
  const handleLangChange = () => {
    const newLang = lang === 'AR' ? 'EN' : 'AR'
    dispatch(langAction(newLang))
  }

  return (
    <CHeader className="mb-2">
      <CContainer fluid>
        <CHeaderToggler
          onClick={() => {
            handleChange()
          }}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>

        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <Link to={'/'}>
            <img src={logo} style={{ width: '5rem', height: '40px' }} alt="Logo" />
          </Link>
        </CHeaderBrand>

        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink to="/" component={NavLink}>
              Dashboard
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">Users</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">Settings</CNavLink>
          </CNavItem>
        </CHeaderNav>

        <CHeaderNav className="d-flex align-items-center">
          <CNavItem>
            <button
              onClick={(e) => {
                e.preventDefault()
                handleLangChange()
              }}
              className="btn btn-primary p-1 rounded-5"
            >
              {lang}
            </button>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilBell} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilEnvelopeOpen} size="lg" />
            </CNavLink>
          </CNavItem>
        </CHeaderNav>

        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
