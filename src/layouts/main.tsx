import React, { useEffect, useState } from 'react'

import dynamic from 'next/dynamic'
import Link from 'next/link'

import { useRouter } from 'next/router'
import { useSession, getSession } from 'next-auth/client'

import {
  SmileOutlined,
  SettingOutlined,
  PlaySquareOutlined,
} from '@ant-design/icons'

import { Route, MenuDataItem } from '@ant-design/pro-layout/lib/typings'
import { SiderMenuProps } from '@ant-design/pro-layout/lib/SiderMenu/SiderMenu'

import RightContent from '../components/GlobalHeader/RightContent'
import User from '../lib/db/models/User'

const ProLayout = dynamic(() => import('@ant-design/pro-layout'), {
  ssr: false,
})

const ROUTES: Route = {
  path: '/',
  routes: [
    {
      path: '/',
      name: 'Welcome',
      icon: <SmileOutlined />,
      routes: [
        {
          path: '/welcome',
          name: 'Account Settings',
          icon: <SettingOutlined />,
        },
      ],
    },
    {
      path: '/example',
      name: 'Example Page',
      icon: <PlaySquareOutlined />,
    },
  ],
}

const menuHeaderRender = (
  logoDom: React.ReactNode,
  titleDom: React.ReactNode,
  props: SiderMenuProps
) => (
  <Link href="/">
    <a>
      {logoDom}
      {!props?.collapsed && titleDom}
    </a>
  </Link>
)

const menuItemRender = (options: MenuDataItem, element: React.ReactNode) => (
  <Link href={options.path}>
    <a>{element}</a>
  </Link>
)

const rightContentRenderer = (currentUser) => {
  return (
    <RightContent currentUser={currentUser} />
  )
}

const MainLayout: React.FC = ({ children }) => {
  
  const router = useRouter()
  const [session, loading] = useSession()

  const [currentUser, setCurrentUser] = useState<User>(undefined)

  const getCurrentUser = async () => {
    const currentUser = await getSession()
    setCurrentUser(currentUser.user)
  }

  useEffect(() => {
    getCurrentUser()
  }, [])

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== 'undefined' && loading) return null

  // If no session exists, display access denied message
  if (typeof window !== 'undefined' && !session) {
    router.push({
      pathname: '/api/auth/signin',
      query: {
        callbackUrl: window.location.href
      }
    })
    return <></>
  }

  return (
    <ProLayout
      style={{ minHeight: '100vh' }}
      route={ROUTES}
      menuItemRender={menuItemRender}
      menuHeaderRender={menuHeaderRender}            
      layout={"top"}
      rightContentRender={() => rightContentRenderer(currentUser)}
    >
      {children}
    </ProLayout>
  )
}

export default MainLayout