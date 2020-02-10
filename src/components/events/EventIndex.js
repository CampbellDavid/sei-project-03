import React from 'react'
import axios from 'axios'
// import MapGL, { Marker, Popup } from 'react-map-gl'
// import Geocoder from 'react-map-gl-geocoder'
import EventCard from './EventCard'

// const mapboxToken = process.env.MAPBOX_ACCESS_TOKEN

class eventIndex extends React.Component {

  state = {
    events: null
    // errors: {}
  }

  async componentDidMount() {
    try {
      const events = await axios.get('/api/events')
      console.log(events)
      this.setState({ events: events.data })
    } catch (err) {
      console.log(err)
      // this.setState({ errors: err.response.data.errors })
    }
  }

  render() {
    if (!this.state.events) return null
    const eventArr = this.state.events
    return (
      <section className="event-index-section">
        <div className="container">
          {eventArr.map(event => <EventCard key={event._id} {...event} />)}
        </div>
      </section>
    )
  }

}

export default eventIndex