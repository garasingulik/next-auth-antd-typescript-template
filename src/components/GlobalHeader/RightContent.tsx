import React from 'react'
import User from '../../lib/db/models/User'

import Avatar from './AvatarDropdown'

interface RightContentProps {
  currentUser?: User
}

const RightContent: React.FC<RightContentProps> = (props) => {
  const { currentUser } = props
  return (
    <div className="rightContent">
      <Avatar menu currentUser={currentUser}/>
    </div>
  )
}

export default RightContent