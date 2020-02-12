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
    <div>
      <h1>{pub.name}</h1>
      <img src={pub.image}/>
      <p>{pub.description}</p>
      <p>{pub.streetName}</p>
      <p>{pub.city}</p>
      <p>{pub.postcode}</p>
      <p>{pub.phone}</p>
      <a href={pub.website}>Visit Pub Website</a>
      <p>Maximun Team size: {pub.maxTeamSize}</p>
      <p>Day of Quiz: {pub.quizDay}</p>
      <h2>Time of Quiz: {pub.quizTime}</h2>
      {/* <h2>{pub.starRating}</h2> */}
      <h2>Average Cost of a Pint: {pub.averagePintCost}</h2>
      {/* <h2>{pub.reviews}</h2> */}
      <Link to="/events/new">
        <button type="button">New Event</button>
      </Link>
    </div>
  )
}
}