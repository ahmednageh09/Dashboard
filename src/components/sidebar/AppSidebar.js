import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CSidebar, CSidebarBrand, CSidebarNav } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

import logoNegative from '../../assets/images/soinLogo.png'
import { sygnet } from '../../assets/brand/sygnet'

import SimpleBar from 'simplebar-react'
import sidebarAction from '../../../src/redux/actions/sidebarAction'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigation from './_nav'
import { Link } from 'react-router-dom'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebar.sidebarShow)

  return (
    <CSidebar
      className="w-20"
      position="fixed"
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch(sidebarAction(visible))
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <Link to={'/'}>
          <img src={logoNegative} alt="dd" width="180px" height={114} />
        </Link>
        <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
