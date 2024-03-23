import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilAudio,
  cilBadge,
  cilBell,
  cilBlur,
  cilBullhorn,
  cilBurn,
  cilCash,
  cilChart,
  cilCheckCircle,
  cilClone,
  cilCommentBubble,
  cilExternalLink,
  cilFlagAlt,
  cilGift,
  cilGlobeAlt,
  cilGroup,
  cilImage,
  cilInput,
  cilLibrary,
  cilLocationPin,
  cilMap,
  cilPhone,
  cilSettings,
  cilSpeedometer,
  cilStorage,
  cilTouchApp,
  cilViewQuilt,
  cilXCircle,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'MAIN',
  },
  {
    component: CNavItem,
    name: 'Reports',
    to: '/reports',
    icon: <CIcon icon={cilChart} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Stock',
    to: '/stock',
    icon: <CIcon icon={cilStorage} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Orders',
    to: '/orders/all',
    icon: <CIcon icon={cilCheckCircle} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Financial Transactions',
    to: '/orders/financial_transactions',
    icon: <CIcon icon={cilCash} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Products',
  },
  {
    component: CNavItem,
    name: 'Products',
    to: '/products',
    icon: <CIcon icon={cilBlur} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Request Product',
    to: '/products/request',
    icon: <CIcon icon={cilFlagAlt} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Notify Me',
    to: '/products/notify',
    icon: <CIcon icon={cilBullhorn} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Areas',
  },
  {
    component: CNavItem,
    name: 'Countries',
    to: '/countries',
    icon: <CIcon icon={cilGlobeAlt} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Cities',
    to: '/cities',
    icon: <CIcon icon={cilMap} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Regions',
    to: '/regions',
    icon: <CIcon icon={cilLocationPin} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Extras',
  },
  {
    component: CNavItem,
    name: 'Offers',
    to: '/offers',
    icon: <CIcon icon={cilGift} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Discounts',
    to: '/discounts',
    icon: <CIcon icon={cilBurn} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Marketing',
  },
  {
    component: CNavItem,
    name: 'Customers',
    to: '/customers',
    icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Comments',
    to: '/comments',
    icon: <CIcon icon={cilCommentBubble} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Contacts',
    to: '/contacts',
    icon: <CIcon icon={cilPhone} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Abandoned Carts',
    to: '/abandoned_carts',
    icon: <CIcon icon={cilXCircle} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Links',
    to: '/links',
    icon: <CIcon icon={cilTouchApp} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Categories',
        to: '/links/categories',
      },
      {
        component: CNavItem,
        name: 'Products',
        to: '/links/products',
      },
      {
        component: CNavItem,
        name: 'Pages',
        to: '/links/pages',
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'Settings',
  },
  {
    component: CNavItem,
    name: 'Templates',
    to: '/templates',
    icon: <CIcon icon={cilLibrary} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Mailing Templates',
    to: '/mailingTemplates',
    icon: <CIcon icon={cilClone} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Styles',
    to: '/styles',
    icon: <CIcon icon={cilViewQuilt} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Mailing List',
    to: '/mailingList',
    icon: <CIcon icon={cilExternalLink} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Notifications',
    to: '/notifications',
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Tickets',
    to: '/tickets',
    icon: <CIcon icon={cilInput} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Active Tickets',
        to: '/tickets/active',
      },
      {
        component: CNavGroup,
        name: 'Ticket Settings',
        to: '/tickets/settings',
        items: [
          {
            component: CNavItem,
            name: 'Ticket Categories',
            to: '/tickets/category',
          },
          {
            component: CNavItem,
            name: 'Ticket Priorities',
            to: '/tickets/priority',
          },
        ],
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Online Customers',
    to: '/onlineCustomers',
    icon: <CIcon icon={cilAudio} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Images Settings',
    to: '/imagesSettings',
    icon: <CIcon icon={cilImage} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Security',
    to: '/security',
    icon: <CIcon icon={cilBadge} customClassName="nav-icon" />,
    items: [
      { component: CNavItem, name: 'Roles', to: '/role' },
      { component: CNavItem, name: 'Admins', to: '/admins' },
    ],
  },
  {
    component: CNavItem,
    name: 'Settings',
    to: '/settings',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
  },
]

export default _nav
