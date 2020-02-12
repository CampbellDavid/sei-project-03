import React from 'react'
import { Link } from 'react-router-dom'

const EventCard = ({ name, events, _id }) => (
  <div className="card-container">
    <Link to={`/events/${_id}`}>
      <div className="card">
        <div className="colour-header">
          <h2>{name}</h2>
        </div>
        <div className="card-info">
          {events.map((event, i) => {
            return (
              <p key={i}>{event.quizDay} | {event.quizTime} | {event.entryFee}</p>
            )
          })}
        </div>
      </div>
    </Link>
  </div>
)
export default EventCard