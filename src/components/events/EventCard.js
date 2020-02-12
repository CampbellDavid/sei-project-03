import React from 'react'
import { Link } from 'react-router-dom'
// import Map from '../common/Map'
const EventCard = ({ entryFee, quizDay, quizTime, _id }) => (
  <div className="card-container">
    <Link to={`/events/${_id}`}>
      <div className="card">
        <div className="colour-header">
          <h2>{name}</h2>
        </div>
        <div className="card-info">

          <p>{entryFee} | {quizDay} | {quizTime}</p>

        </div>
      </div>
      {/* <div className="map-container">
        <Map />
      </div> */}
    </Link>
  </div>
)
export default EventCard