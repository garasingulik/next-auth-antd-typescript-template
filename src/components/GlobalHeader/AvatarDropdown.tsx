import React from 'react'
import { signOut } from 'next-auth/client'

import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Menu, Spin } from 'antd'

import HeaderDropdown from './HeaderDropdown'

export interface AvatarDropdownProps {
  currentUser?: any
  menu?: boolean
}

export const AvatarDropdown: React.FC<AvatarDropdownProps> = (props) => {
  const {
    currentUser = {
      avatar: '',
      name: ''
    },
    menu
  } = props

  const onMenuClick = (event) => {
    const { key } = event
    if (key === 'logout') {
      signOut()
    }
  }

  const menuHeaderDropdown = (
    <Menu className="menu" selectedKeys={[]} onClick={onMenuClick}>
      {menu && (
        <Menu.Item key="center">
          <UserOutlined />
            Account Center
        </Menu.Item>
      )}
      {menu && (
        <Menu.Item key="settings">
          <SettingOutlined />
            Settings
        </Menu.Item>
      )}
      {menu && <Menu.Divider />}

      <Menu.Item key="logout">
        <LogoutOutlined />
          Logout
        </Menu.Item>
    </Menu>
  )

  return currentUser && currentUser.name ? (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`action account`}>
        <Avatar size="small" className="avatar" src={currentUser.image} alt="avatar" icon={<UserOutlined />} />
        <span className="name">{currentUser.name}</span>
      </span>
    </HeaderDropdown>
  ) : (
      <span className="action account">
        <Spin
          size="small"
          style={{
            marginLeft: 8,
            marginRight: 8
          }}
        />
      </span>
    )
}

export default AvatarDropdown