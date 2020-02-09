import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => (
  <nav>
    <Link to="/">Home</Link>
    <Link to="/pubs">Pubs</Link>
    <Link to="/events">Events</Link>
    <Link to="/login">Login</Link>
    <Link to="/register">Register</Link>
  </nav> 
)

export default Nav