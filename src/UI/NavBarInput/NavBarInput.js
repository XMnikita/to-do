import React from 'react'
import './NavBarInput.css'

const NavBarInput = (props) => {
  const cls = ['NavBarInput']
  if (props.isSelected) cls.push('selected')
  return (
    <div className={cls.join(' ')}>
      <i
        onClick={() => document.getElementById('NavBarInput').focus()}
        className="material-icons"
      >
        add
      </i>
      <input
        onKeyPress={props.onAddHandler}
        hidden={props.hidden}
        id="NavBarInput"
        placeholder="Create List"
      ></input>
    </div>
  )
}

export default NavBarInput
