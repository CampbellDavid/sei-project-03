import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
// import { withAuth } from '@okta/okta-react'

class TeamCard extends React.Component {
  state = {
    team: {
      name: '',
      captain: '',
      members: []
    },
    user: ''
  }

  // checkAuthentication = async () => {
  //   const authenticated = await this.props.auth.isAuthenticated()
  //   if (authenticated && !this.state.userinfo) {
  //     const user = await this.props.auth.getUser()
  //     this.setState({ user })
  //   }
  //   console.log('user is not logged in')
  // }

  handleSubmit = async (e) => {
    e.preventDefault() 
    this.setState({ members: [...this.state.members, this.state.user] })
    
    try {
      const res = await axios.post('/api/teams/:id', this.state.team) //!not quite right
      console.log(res)
    } catch (err) {
      console.log(err)
    }
    console.log(this.state.team.members)

  }

  render() {
    const { name, captain, members, _id } = this.state.team
    return (
      <section className="column">
        <Link to={`/teams/${_id}`}>
          <div>
            <h2 className="header">{name}</h2>
            <ul>
              <li>Captain: {captain}</li>
              <li>Members: {members}</li>
            </ul>
            <form onSubmit={this.handleSubmit}>
              <button type="submit">Join Team</button>       
            </form>
          </div>
  
        </Link>
      </section>
    )
  }
}

export default TeamCard