import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { notify } from 'react-notify-toast'
import Authorization from '../../../lib/authorization'


class Nav extends React.Component {
  state = { loggedIn: false }



  toggleNavbar = () => {
    this.setState({ loggedIn: !this.state.loggedIn })
  }

  handleLogout = () => {
    Authorization.logout()
    notify.show('You\'ve logged out!', 'custom', 3000, { background: 'FFFFF0' })
    this.props.history.push('/')
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setState({ loggedIn: false })
    }
  }

  render() {

    return (

      <nav className="navbar">
        <Link className="nav-item" to="/">Home</Link>
        <Link className="nav-item" to="/pubs">Pubs</Link>
        <Link className="nav-item" to="/events">Events</Link>
        {!Authorization.isAuthenticated() && <Link className="nav-item" to="/login">Login</Link>}
        {!Authorization.isAuthenticated() && <Link className="nav-item" to="/register">Register</Link>}
        {Authorization.isAuthenticated() && <span onClick={this.handleLogout} ><Link className="nav-item" to="/">Logout</Link></span>}

      </nav>
    )

  }

}



export default withRouter(Nav)