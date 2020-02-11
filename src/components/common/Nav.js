import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => (
  <nav className="navbar">
    <Link className="nav-item" to="/">Home</Link>
    <Link className="nav-item" to="/pubs">Pubs</Link>
    <Link className="nav-item" to="/events">Events</Link>
    {/* //! CR: below to be deleted later */}
    <Link className="nav-item" to="/events/new">New Event</Link>
    <Link className="nav-item" to="/login">Login</Link>
    <Link className="nav-item" to="/register">Register</Link>
  </nav> 
)

export default Nav