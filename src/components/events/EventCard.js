import React from 'react'
import { Link } from 'react-router-dom'
// import Map from '../common/Map'
const EventCard = ({ name, events, _id }) => (
  <div className="card-container">
    <Link to={`/events/${_id}`}>
      <div className="card">
        <div className="colour-header">
          <h2>{name}</h2>
        </div>
        <div className="card-info">
<<<<<<< HEAD
          <h3>Entry Fee: {events.map((event, i) => {
            return <p key={i}>{event.entryFee}</p>
          })}</h3>
          {/* <h3>Date: {quizDay}</h3>
          <h3>Time: {quizTime}</h3> */}
=======
          {events.map((event, i) => {
            return (
              <p key={i}>{event.quizDay} | {event.quizTime} | {event.entryFee}</p>
            )
          })}
>>>>>>> 7ff676b9eb93c85112330d490c9cf3188243823e
        </div>
      </div>
      {/* <div className="map-container">
        <Map />
      </div> */}
    </Link>
  </div>
)
export default EventCard