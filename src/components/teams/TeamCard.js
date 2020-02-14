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
    const teamId = this.props._id
    try {
      const res = await axios.get(`/api/teams/${teamId}`)
      console.log('DATA FOR CARD', res.data)
      this.setState({ team: res.data })
    } catch (error) {
      this.setState({ errors: error.res.data.errors })
    }
  }

  handleClick = async e => {
    e.preventDefault()

    const userId = Authorization.getPayload().sub
    console.log(userId)
    const membersArr = this.state.team.members
    try {
      const response = await axios.get(`/api/profiles/${userId}`)
      const currentUser = membersArr.filter(member => member._id === userId)
      const index = membersArr.indexOf(currentUser)
      console.log('array', membersArr)
      console.log(index)
      console.log('currentUser', currentUser)

      if (membersArr.includes(currentUser[0]) && index !== -1 ) {
        this.setState({ members: membersArr })
        membersArr.splice(index, 1)
      } else {
        membersArr.push(response.data)
        this.setState({ members: membersArr })
      }

      // this.setState({ members: membersArr })

      console.log(membersArr)
    } catch (err) {
      console.log(err)
    }
  }




  render() {
    const userId = Authorization.getPayload().sub
    const { team } = this.state
    console.log(this.state)

    return (
      <>
        <div className="card">
          <div className="card-info">
            <h2>{team.teamName}</h2>
          </div>
          <h2>{team.event}</h2>
          <h3>Captain: {team.captain.username}</h3>
          <h3>Members: {team.members.map((member, i) => {
            return <li key={i}><Link to={`/profiles/${member._id}`}>{member.username}</Link></li>
          })}</h3>

          {Authorization.isAuthenticated() ?
            <div className="buttons">
              {team.members.some(member => member._id === userId) ?
                <button type="button" className="button" onClick={this.handleClick}>Leave Team</button> :
                <button type="button" className="button" onClick={this.handleClick}>Join Team</button>}
              {this.isOwner() && <button type="button" className="button">Edit Team</button>}
            </div>
            : null}
        </div>

      </>
    )
  }

}

export default TeamCard

// TODO: fix filter method
// TODO: new team function