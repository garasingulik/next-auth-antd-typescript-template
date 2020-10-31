import React from "react"
import { signOut } from 'next-auth/client'

import { Button } from "antd"

const UserMenu: React.FC = () => {

  const onClick = (e) => {
    e.preventDefault()
    signOut()
  }

  return (
    <div style={{ marginRight: '20px' }}>
      <Button type="dashed" className="logoutButton" onClick={onClick}>Logout</Button>
    </div>
  )
}

export default UserMenu