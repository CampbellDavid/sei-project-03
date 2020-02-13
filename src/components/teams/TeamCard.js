import React from 'react'
import Authorization from '../../../lib/authorization'
import { Link } from 'react-router-dom'

const TeamCard = ({ members, captain, event, teamName }) => (
  <>
    <h2>{teamName}</h2>
    <h2>{event}</h2>
    <h3>Captain: {captain.username}</h3>
    <h3>Members: {members.map((member, i) => {
      return <li key={i}><Link to={`/profiles/${member._id}`}>{member.username}</Link></li>
    })}</h3>

    {Authorization.isAuthenticated() ?
      <div className="buttons">
        <button type="button" className="button">Join Team</button>
        <button type="button" className="button">Edit Team</button>
      </div>
      : null}
  </>
)

export default TeamCard
