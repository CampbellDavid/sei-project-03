import React from 'react'
import TeamShow from './TeamShow'
import { Link } from 'react-router-dom'


const TeamCard = ({ members, captain, event, teamName, _id }) => (
  <>
    <h2>{teamName}</h2>
    <h3>Captain: {captain.username}</h3>
    <h3>Members: {members.map((member, i) => {
      return <li key={i}>{member.username}</li>
    })}</h3>
    {/* <Link to={`/events/${event._id}/teams/${_id}`}><h3>View team</h3></Link> */}
  </>
)

export default TeamCard