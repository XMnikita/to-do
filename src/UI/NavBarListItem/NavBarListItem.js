import React from 'react'
import './NavBarListItem.css'

const NavBarListItem = (props) => {
  const cls = ['NavBarListItem']
  if (props.isSelected) cls.push('selected')

  return (
    <li className={cls.join(' ')} onClick={props.onClick}>
      <div>
        <i className="material-icons">{props.type}</i>
        <span>{props.projectName}</span>
      </div>
      <span>{props.taskCount}</span>
    </li>
  )
}

export default NavBarListItem
