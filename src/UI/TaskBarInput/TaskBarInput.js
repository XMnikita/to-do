import React from 'react'
import './TaskBarInput.css'

const TaskBarInput = (props) => {
  const cls = ['TaskBarInput']
  if (props.isSelected) cls.push('selected')
  return (
    <div className={cls.join(' ')}>
      <i
        onClick={() => document.getElementById('TaskBarInput').focus()}
        className="material-icons"
      >
        add
      </i>
      <input
        onKeyPress={props.onAddTask}
        hidden={props.hidden}
        id="TaskBarInput"
        placeholder="Create Task"
      ></input>
    </div>
  )
}

export default TaskBarInput
