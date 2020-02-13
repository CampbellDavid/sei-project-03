import React from 'react'
import { Link } from 'react-router-dom'
// import Map from '../common/Map'
const EventCard = ({ pub, entryFee, quizDay, quizTime, _id }) => (
  <div className="card-container">
    <Link to={`/events/${_id}`}>
      <div className="card">
        <div className="colour-header">
          <h2>{pub}</h2>
        </div>
        <div className="card-info">

          <p>{entryFee} | {quizDay} | {quizTime}</p>

        </div>
      </div>
    </Link>
  </div>
)
export default EventCard