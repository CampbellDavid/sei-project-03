import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class PubShow extends React.Component {
state = {
  pub: []
}

async componentDidMount() {
  const pubId = this.props.match.params.id
  try {
    const res = await axios.get(`/api/pubs/${pubId}`)
    console.log(res.data)
    this.setState({ pub: res.data })
  } catch (err) {
    console.log(err)
  }
}

render() {
  const { pub } = this.state
  return (
    <div className="pub-show">

      <div className="pub-info">
        <h1>{pub.name}</h1>
        {/* <h2>{pub.starRating}</h2> */}
        <img className="pub-image" src={pub.image}/>
        <p>{pub.description}</p>
        <a href={pub.website}>Visit Pub Website</a>
        <div>
          <Link to="/events/new">
            <button 
              className="button"
              type="button">New Event</button>
          </Link>
          <Link to="/pubs/:id/edit">
            <button 
              className="button"
              type="button">Edit Pub</button>
          </Link>
        </div>
      </div>

      <div className="sidebar">
        <div className="address">
          <h2>Address Info:</h2>
          <p>{pub.streetName}</p>
          <p>{pub.city}</p>
          <p>{pub.postcode}</p>
          <p>{pub.phone}</p>
        </div>
        
        <div className="quiz-info">
          <h2>Quiz Info:</h2>
          <p>Maximum Team size: {pub.maxTeamSize}</p>
          <p>Day of Quiz: {pub.quizDay}</p>
          <p>Time of Quiz: {pub.quizTime}</p>
          <p>Average Cost of a Pint: {pub.averagePintCost}</p>
        </div>
      </div>

      
      <div className="reviews">
        {/* <h2>{pub.reviews}</h2> */}
      </div>
      

    </div>
  )
}
}