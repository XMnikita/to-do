import React from 'react'
import './TaskBarListItem.css'

const TaskBarListItem = (props) => {
  const cls = ['TaskBarListItem']
  if (props.isComplete) {
    cls.push('completed')
  }
  return (
    <div onClick={props.onClick} className={cls.join(' ')}>
      <i className="material-icons">
        {props.isComplete ? 'check_box' : 'check_box_outline_blank'}
      </i>
      <p>{props.text}</p>
    </div>
  )
}
export default TaskBarListItem
