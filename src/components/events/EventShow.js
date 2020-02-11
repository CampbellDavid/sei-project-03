import React from 'React'
import axios from 'axios'
// import { Link } from 'react-router-dom'

export default class EventShow extends React.Component {
state = {
  events: []
}

async componentDidMount() {
  const eventId = this.props.match.params.id
  try {
    const res = await axios.get(`/api/events/${eventId}`)
    console.log(res.data)
    this.setState({ events: res.data })
  } catch (error) {
    console.log(error)
  }
}

render() {

  return (
    <h1>Event Show Page</h1>
  )
}
} 