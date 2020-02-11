import React from 'react'
import { Link } from 'react-router-dom'


//! CR: we will need to change the deconstructed props based on 
//! the changes to the model DC is making Tues 11th 10:50

const EventCard = ({ teamName, entryFee, quizDay, quizTime, _id }) => (
  <div className="card-container">
    <Link to={`/events/${_id}`}>
    
      <div className="card">
        <div className="colour-header">
          <h2>Team Name: {teamName}</h2>
        </div>
        <div className="card-info">
          <h3>Entry Fee: {entryFee}</h3>
          <h3>Day: {quizDay}</h3>
          <h3>Time: {quizTime}</h3>
        </div>
      </div>
    
    </Link>
  </div>
)

export default EventCard