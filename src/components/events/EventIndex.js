import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import EventCard from './EventCard'
import MapComp from '../common/MapComp'


export default class EventIndex extends React.Component {
  state = {
    events: null,
    postcodes: null,
    pubs: null,
    viewport: {
      latitude: 51.5074,
      longitude: 0.1278,
      zoom: 9
    }
  }

  mapboxToken = process.env.MAPBOX_ACCESS_TOKEN
  mapRef = React.createRef()
  handleViewportChange = viewport => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    })
  }
  handleGeocoderViewportChange = viewport => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 }
    this.setState({
      viewport: {
        latitude: viewport.latitude,
        longitude: viewport.longitude,
        zoom: viewport.zoom
      }
    })
    return this.handleViewportChange({
      ...viewport,
      ...geocoderDefaultOverrides
    })
  }



  async componentDidMount() {
    try {
      const { data } = await axios.get('/api/events')
      console.log('data', data)
      this.setState({ events: data })
      this.getPostcodes()
    } catch (err) {
      console.log(err)
    }
  }

  async getPostcodes() {
    const postcodes = this.state.pubs.map(pub => {
      return pub.postcode
    })
    const res = await axios.post(
      'https://cors-anywhere.herokuapp.com/api.postcodes.io/postcodes',
      { postcodes }
    )
    // console.log(res.data.result)
    this.setState({ postcodes: res.data.result })
  }

  render() {
    console.log('events', this.state.events)
    if (!this.state.events) return null
    if (!this.state.postcodes) return null
    // const eventArr = this.state.events
    return (
      <section>
        <h1>Find an event near you!</h1>
        <div className="index">
          <div className="container">
            {this.state.events.map(event => (
              <EventCard key={event._id} {...event} />
            ))}
            <Link to="/events/new">
              <button type="button">New Event</button>
            </Link>
          </div>
          <div className="map-container">
            {/* <Map goes here/> */}
          </div>
        </div>
<<<<<<< HEAD
        <Link to="/events/new">
          <button type="button">New Event</button>
        </Link>

        <div className="map-container">
          <MapComp 
            viewport={this.state.viewport} 
            handleGeocoderViewportChange={this.handleGeocoderViewportChange}
            handleViewportChange={this.handleViewportChange} 
            mapboxToken={this.mapboxToken}
            mapRef={this.mapRef} 
            postcodes={this.state.postcodes}
            pubs={this.state.pubs} 
          />
        </div>
=======
>>>>>>> development
      </section>
    )
  }

}