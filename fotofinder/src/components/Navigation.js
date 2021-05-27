import React from 'react'
import {NavLink} from 'react-router-dom'

const Navigation = () => {
  return (
    <nav className="main-nav">
      <ul>
        <li><NavLink to="/app">App</NavLink></li>
        <li><NavLink to="/stem">Stem</NavLink></li>
        <li><NavLink to="/coding">Coding</NavLink></li>
        <li><NavLink to="/challenge">Challenge</NavLink></li>
      </ul>
    </nav>
  )
}

export default Navigation;