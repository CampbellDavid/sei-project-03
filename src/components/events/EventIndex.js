import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import EventCard from './EventCard'


export default class EventIndex extends React.Component {
  state = {
    events: null
  }

  async componentDidMount() {
    try {
      const { data } = await axios.get('/api/events')
      console.log('data', data)
      this.setState({ events: data })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    console.log('events', this.state.events)
    if (!this.state.events) return null
    // const eventArr = this.state.events
    return (
      <section className="event-index-section">
        <h1>Find an event near you!</h1>
        <div className="container">
          {this.state.events.map(event => (
            <EventCard key={event._id} {...event} />
          ))}
        </div>
        <Link to="/events/new">
          <button type="button">New Event</button>
        </Link>
      </section>
    )
  }

}