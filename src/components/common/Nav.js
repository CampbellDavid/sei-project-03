import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => (
  <nav className="navbar">
    <Link className="nav-item" to="/">Home</Link>
    <Link className="nav-item" to="/api/pubs">Pubs</Link>
    <Link className="nav-item" to="/api/events">Events</Link>
    <Link className="nav-item" to="/api/login">Login</Link>
    <Link className="nav-item" to="/api/register">Register</Link>
  </nav> 
)

export default Nav