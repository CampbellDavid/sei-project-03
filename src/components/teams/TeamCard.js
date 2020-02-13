import React from 'react'


const TeamCard = ({ members, captain, event, teamName, _id }) => (
  <>
    <h2>{teamName}</h2>
    <h3>Captain: {captain.username}</h3>
    <h3>Members: {members.map((member, i) => {
      return <li key={i}>{member.username}</li>
    })}</h3>
  </>
)

export default TeamCard