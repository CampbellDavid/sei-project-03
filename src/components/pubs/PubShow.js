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
      <h2>{pub.name}</h2>
      <h2>{pub.image}</h2>
      <h2>{pub.description}</h2>
      <h2>{pub.streetName}</h2>
      <h2>{pub.city}</h2>
      <h2>{pub.postcode}</h2>
      <h2>{pub.phone}</h2>
      <h2>{pub.website}</h2>
      <h2>{pub.maxTeamSize}</h2>
      <h2>{pub.quizDay}</h2>
      <h2>{pub.quizTime}</h2>
      <h2>{pub.starRating}</h2>
      <h2>{pub.averagePintCost}</h2>
      <h2>{pub.reviews}</h2>
      <Link to="/events/new">
        <button type="button">New Event</button>
      </Link>
    </div>
  )
}
}