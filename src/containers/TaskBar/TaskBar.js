import React, { useState } from 'react'
import ButtonWithIcon from '../../UI/Button/ButtonWithIcon'
import TaskBarEditList from '../../UI/TaskBarEditList/TaskBarEditList'
import TaskBarInput from '../../UI/TaskBarInput/TaskBarInput'
import TaskBarListItem from '../../UI/TaskBarListItem/TaskBarListItem'
import ContextMenu from '../ContextMenu/ContextMenu'
import './TaskBar.css'

const TaskBar = (props) => {
  const initialState = {
    editList: false,
    contextMenu: false,
    lastX: 0,
    lastY: 0,
    project: props.project,
  }
  const [state, setState] = useState(initialState)

  function shangeContextMenu(event) {
    // console.log(event)
    setState((prevState) => {
      return {
        ...prevState,
        contextMenu: !state.contextMenu,
        lastX: event.clientX,
        lastY: event.clientY,
      }
    })
  }

  function addTaskHandler(event) {
    if (event.code === 'Enter') {
      props.onAddTaskHandler(props.projectId, event.target.value)
      event.target.value = ''
    }
  }

  function onDeleteList() {
    props.deleteProject(props.projectId)
    setState((prevState) => {
      return {
        ...prevState,
        contextMenu: false,
      }
    })
  }

  function onEditList() {
    setState((prevState) => {
      return {
        ...prevState,
        contextMenu: false,
        editList: true,
      }
    })
  }

  function changeProjectName(name) {
    if (name.trim() !== '') {
      props.editProject(props.projectId, name)
    }
    setState((prevState) => {
      return {
        ...prevState,
        contextMenu: false,
        editList: false,
      }
    })
  }

  function taskClickHandler(event) {
    const ul = event.target.closest('.TaskBar')
    const li = event.target.closest('.TaskBarListItem')
    const nodes = [...ul.childNodes]
    const taskId = nodes.findIndex((el) => el === li)
    props.taskClick(props.projectId, taskId)
  }

  function onClearTasks() {
    props.clearTasks(props.projectId)
    setState((prevState) => {
      return {
        ...prevState,
        contextMenu: false,
      }
    })
  }

  return (
    <div className="TaskBarContainer">
      {state.contextMenu ? (
        <ContextMenu
          deleteList={onDeleteList}
          editList={onEditList}
          clearTasks={onClearTasks}
          x={state.lastX}
          y={state.lastY}
        />
      ) : null}
      {!props.project ? (
        <h2 className="Warning">Choose or Create Project</h2>
      ) : (
        <React.Fragment>
          <div className="TaskBarTitle">
            {state.editList ? (
              <TaskBarEditList
                onChange={changeProjectName}
                projectName={props.project.name}
              />
            ) : (
              <h2>{props.project.name}</h2>
            )}
            <ButtonWithIcon
              onClick={(event) => shangeContextMenu(event)}
              type="more_horiz"
            />
          </div>
          <TaskBarInput onAddTask={(event) => addTaskHandler(event)} />
          <div className="TaskBar">
            {props.project.tasks.map((el, index) => {
              return (
                <TaskBarListItem
                  isComplete={el.isChecked ? true : false}
                  onClick={(event) => taskClickHandler(event)}
                  text={el.text}
                  key={index}
                />
              )
            })}
          </div>{' '}
        </React.Fragment>
      )}
    </div>
  )
}
export default TaskBar
