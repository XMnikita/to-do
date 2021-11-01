import React from 'react'
import './ButtonWithIcon.css'

const ButtonWithIcon = (props) => {
  return (
    <button onClick={props.onClick} className="ButtonWithIcon">
      <i className="material-icons">{props.type}</i>
    </button>
  )
}

export default ButtonWithIcon
