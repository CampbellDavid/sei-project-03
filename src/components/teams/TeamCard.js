import React from 'react'
import Authorization from '../../../lib/authorization'
import axios from 'axios'
import { Link } from 'react-router-dom'

class TeamCard extends React.Component {

  state = {
    team: {
      teamName: '',
      members: [],
      captain: '',
      user: '',
      _id: ''
    },
    errors: {}
  }

  isOwner = () => Authorization.getPayload().sub === this.state.team._id


  async componentDidMount() {
    const teamId = this.props.match.params.id
    try {
      const res = await axios.get(`/api/teams/${teamId}`)
      console.log(res.data)
      this.setState({ team: res.data })
    } catch (error) {
      this.setState({ errors: error.res.data.errors })
    }
  }

  // handleClick = e => {
  //   e.preventDefault()

  // }

  // handleChange

  render() {
    const { team } = this.state
    console.log(this.state)
    return (
      <>
        <h2>{team.teamName}</h2>
        <h2>{team.event}</h2>
        <h3>Captain: {team.captain.username}</h3>
        <h3>Members: {team.members.map((member, i) => {
          return <li key={i}><Link to={`/profiles/${member._id}`}>{member.username}</Link></li>
        })}</h3>

        {Authorization.isAuthenticated() ?
          <div className="buttons">
            <button type="button" className="button">Join Team</button>
            {this.isOwner() && <button type="button" className="button">Edit Team</button>}
          </div>
          : null}
      </>
    )
  }

}


export default TeamCard