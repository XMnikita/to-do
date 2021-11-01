import React, { useState } from 'react'
import ButtonWithIcon from '../../UI/Button/ButtonWithIcon'
import NavBarInput from '../../UI/NavBarInput/NavBarInput'
import NavBarListItem from '../../UI/NavBarListItem/NavBarListItem'
import './NavBar.css'

const NavBar = (props) => {
  const initialState = {
    isClosed: false,
  }
  const [state, setState] = useState(initialState)

  const containerCls = () => {
    const cls = ['NavBarContainer']

    if (state.isClosed) {
      cls.push('closed')
    }

    return cls.join(' ')
  }

  function addProject(event) {
    if (event.code === 'Enter') {
      props.onAddProjectHandler(event.target.value)
      event.target.value = ''
      event.target.blur()
    }
  }

  function changeProjectHandler(event) {
    const ul = event.target.closest('ul')
    const li = event.target.closest('.NavBarListItem')
    const nodes = [...ul.childNodes]
    const projectId = nodes.findIndex((el) => el === li)
    props.onClick(projectId)
  }

  return (
    <div className={containerCls()}>
      <div className="NavBar">
        <ButtonWithIcon
          onClick={() =>
            setState((prevState) => {
              return { ...prevState, isClosed: !state.isClosed }
            })
          }
          type={state.isClosed ? 'east' : 'arrow_back'}
        />
        <ul>
          {props.projects.length === 0
            ? null
            : props.projects.map((el, index) => {
                return (
                  <NavBarListItem
                    isSelected={props.currentProject === index ? true : false}
                    type="format_list_bulleted"
                    projectName={state.isClosed ? '' : el.name}
                    taskCount={state.isClosed ? '' : el.taskCount}
                    key={index}
                    onClick={(event) => changeProjectHandler(event)}
                  />
                )
              })}
        </ul>
        <NavBarInput
          onAddHandler={(event) => addProject(event)}
          hidden={state.isClosed}
        />
      </div>
    </div>
  )
}

export default NavBar
