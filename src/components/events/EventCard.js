import React from 'react'
import { Link } from 'react-router-dom'

const EventCard = ({ pub, entryFee, quizDay, quizTime, _id }) => (
  <>
    <Link to={`/events/${_id}`}>
      <div className="card">
        <div className="card-info">
          <h2>{pub}</h2>
          <p>{entryFee} | {quizDay} | {quizTime}</p>
        </div>
      </div>
    </Link>
  </>
)
export default EventCard