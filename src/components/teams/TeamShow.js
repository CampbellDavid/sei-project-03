import React from 'react'


const TeamShow = ({ members, captain, teamName }) => (
  <>
    <h2>{teamName}</h2>
    <h3>Captain: {captain.username}</h3>
    <h3>Members: {members.map((member, i) => {
      return <li key={i}>{member.username}</li>
    })}</h3>
  </>
)

export default TeamShow