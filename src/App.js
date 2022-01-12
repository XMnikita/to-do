import React, { useEffect, useState } from 'react'
import './App.css'
import NavBar from './containers/NavBar/NavBar'
import TaskBar from './containers/TaskBar/TaskBar'
import Loader from './UI/Loader/Loader'

function App() {
  const initialState = {
    isLoading: true,
    currentProject: 0,
    projects: [],
    // [
    // {
    //   name: 'Project 1',
    //   taskCount: 3,
    //   tasks: [
    //     { text: 'Task 1', isChecked: false },
    //     { text: 'Task 2', isChecked: true },
    //     { text: 'Task 3', isChecked: true },
    //   ],
    // },
    // {
    //   name: 'Project 2',
    //   taskCount: 3,
    //   tasks: [
    //     { text: 'Task ', isChecked: false },
    //     { text: 'Task ', isChecked: false },
    //     { text: 'Task sdf', isChecked: false },
    //   ],
    // },
    // ],
  }
  const [state, setState] = useState(initialState)

  useEffect(() => {
    if (state.isLoading) {
      stateFromFirebase()
    } else {
      stateToFirebase(state.projects)
    }
    // console.log(state)
  })

  async function stateToFirebase(data) {
    const url =
      'https://todoapp-3c6d9-default-rtdb.europe-west1.firebasedatabase.app/projects/-Mn7NvBXnS2oP-XlOvLg.json'
    try {
      fetch(url, {
        method: 'PUT', // или 'PUT'
        body: JSON.stringify(data), // данные могут быть 'строкой' или {объектом}!
        headers: {
          'Content-Type': 'application/json',
        },
      })
      // const json = await response.json()
      // console.log('Успех:', JSON.stringify(json))
    } catch (error) {
      console.warn('Ошибка:', error)
    }
  }

  function isCorectProjects(arrPr) {
    let fl = true
    arrPr.forEach((el) => {
      if (!el.tasks) {
        fl = false
      }
    })
    return fl
  }

  function makeDataCorrect(arrPr) {
    return arrPr.map((el) => {
      if (!el.tasks) {
        el.tasks = []
      }
      return el
    })
  }

  async function stateFromFirebase() {
    fetch(
      'https://todoapp-3c6d9-default-rtdb.europe-west1.firebasedatabase.app/projects/-Mn7NvBXnS2oP-XlOvLg.json'
    )
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        if (data) {
          if (!isCorectProjects(data)) {
            const projects = makeDataCorrect(data)
            setState((prev) => {
              return { ...prev, projects, isLoading: false }
            })
          }
          setState((prev) => {
            return { ...prev, projects: data, isLoading: false }
          })
        } else {
          setState((prev) => {
            return { ...initialState, isLoading: false }
          })
        }
      })
  }

  function addProject(name) {
    let currentProject = state.currentProject
    const projects = [...state.projects]
    projects.push({ name: name, taskCount: 0, tasks: [] })
    currentProject = projects.length - 1
    setState((prevState) => {
      return { ...prevState, currentProject, projects }
    })
    stateToFirebase()
  }

  function addTask(projectId, text) {
    const projects = [...state.projects]
    projects[projectId].tasks.push({
      text: text,
      isChecked: false,
    })
    projects[projectId].taskCount += 1
    setState((prevState) => {
      return { ...prevState, projects }
    })
  }

  function changeProject(projectId) {
    const currentProject = projectId
    setState((prevState) => {
      return { ...prevState, currentProject }
    })
  }

  function deleteProject(projectId) {
    const projects = [...state.projects]
    projects.splice(projectId, 1)
    const currentProject = projects.length - 1
    setState((prevState) => {
      return { ...prevState, projects, currentProject }
    })
  }

  function editProject(projectId, name) {
    const projects = [...state.projects]
    projects[projectId].name = name
    setState((prevState) => {
      return { ...prevState, projects }
    })
  }

  function clearTasks(projectId) {
    const projects = [...state.projects]
    const tasks = projects[projectId].tasks.filter((el) => {
      return !el.isChecked
    })
    projects[projectId].taskCount = tasks.length
    projects[projectId].tasks = tasks
    setState((prev) => {
      return { ...prev, projects }
    })
  }

  function taskClick(projectId, taskId) {
    const projects = [...state.projects]
    projects[projectId].tasks[taskId].isChecked =
      !projects[projectId].tasks[taskId].isChecked
    setState((prevState) => {
      return { ...prevState, projects }
    })
  }

  return (
    <div className="App">
      {state.isLoading ? (
        <Loader />
      ) : (
        <React.Fragment>
          <NavBar
            onClick={changeProject}
            projects={state.projects}
            currentProject={state.currentProject}
            onAddProjectHandler={addProject}
          />
          <TaskBar
            clearTasks={clearTasks}
            editProject={editProject}
            deleteProject={deleteProject}
            projectId={state.currentProject}
            project={state.projects[state.currentProject]}
            onAddTaskHandler={addTask}
            taskClick={taskClick}
          />
        </React.Fragment>
      )}
    </div>
  )
}

export default App
