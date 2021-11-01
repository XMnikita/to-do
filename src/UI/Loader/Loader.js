import React from 'react'
import './Loader.css'

const Loader = (props) => {
  return (
    <div className="Loader">
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <h1>Loading...</h1>
    </div>
  )
}

export default Loader
