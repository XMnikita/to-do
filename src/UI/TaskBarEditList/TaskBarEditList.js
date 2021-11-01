import React from 'react'
import './TaskBarEditList.css'

const TaskBarEditList = (props) => {
  const keyDown = (event) => {
    if (event.code === 'Tab') {
      event.preventDefault()
    } else if (event.code === 'Enter') {
      props.onChange(event.target.value)
    }
  }

  return (
    <input
      autoFocus={true}
      onKeyDown={keyDown}
      className="TaskBarEditList"
      type="text"
      defaultValue={props.projectName}
    />
  )
}

export default TaskBarEditList
