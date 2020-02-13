import React from 'react'
import Authorization from '../../../lib/authorization'

class TeamCard extends React.Component {

  state = {
    team: null
  }


  

  handleClick() {

  }
  render() {
    return (
      <>
        <h2>{teamName}</h2>
        <h2>{event}</h2>
        <h3>Captain: {captain.username}</h3>
        <h3>Members: {members.map((member, i) => {
          return <li key={i}>{member.username}</li>
        })}</h3>

        {Authorization.isAuthenticated() ?
          <div className="buttons">
            <button type="button">Join Team</button>
            <button type="button" onClick={this.handleClick}>Edit Team</button>
          </div>
          : null}
      </>
    )
  }

}

export default TeamCard

// TODO: edit team to link to prepopulated teamform.js
// Join team push user object to team members array inside team model

// const TeamCard = ({ members, captain, event, teamName }) => 