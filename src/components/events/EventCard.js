import React from 'react'
import { Link } from 'react-router-dom'

// import Map from '../common/Map'


const EventCard = ({ pub, entryFee, quizDay, quizTime, _id }) => (
  <div className="card-container">
    <Link to={`/events/${_id}`}>
      <div className="card">
        <div className="colour-header">
          <h2>Pub Name: {pub}</h2>
        </div>
        <div className="card-info">
          <h3>Entry Fee: {entryFee}</h3>
          <h3>Date: {quizDay}</h3>
          <h3>Time: {quizTime}</h3>
        </div>
      </div>
      {/* <div className="map-container">
        <Map />
      </div> */}
    </Link>
  </div>
)

export default EventCard