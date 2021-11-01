import React from 'react'
import './ContextMenu.css'

const ContextMenu = (props) => {
  // console.log(props)
  return (
    <div
      className="ContextMenu"
      style={{ top: props.y + 20, left: props.x - 100 }}
    >
      <ul>
        <li className="params">List parametrs</li>
        <li onClick={props.editList} className="edit">
          Edit list
        </li>
        <li onClick={props.clearTasks} className="complited">
          Clear complited tasks
        </li>
        <li onClick={props.deleteList} className="delete">
          Delete list
        </li>
      </ul>
    </div>
  )
}

export default ContextMenu
