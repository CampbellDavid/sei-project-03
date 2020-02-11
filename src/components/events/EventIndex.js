import React from 'react'
import axios from 'axios'
import EventCard from './EventCard'


export default class EventIndex extends React.Component {
  state = {
    events: null
  }

  async componentDidMount() {
    try {
      const res = await axios.get('/api/events')
      // console.log(res.data)
      this.setState({ events: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    if (!this.state.events) return null
    // const eventArr = this.state.events
    return (
      <section className="event-index-section">
        <h1>Find a pub quiz near you!</h1>
        <div className="container">
          {this.state.events.map(event => (
            <EventCard key={event._id} {...event} />
          ))}
        </div>
      </section>
    )
  }

}

{/* {eventArr.map(event => <EventCard key={event._id} {...event} />)} */}