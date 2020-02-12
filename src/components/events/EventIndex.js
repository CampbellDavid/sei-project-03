import React from 'react'
import axios from 'axios'
// import EventCard from './EventCard'
import PubMap from '../common/PubMap'


export default class EventIndex extends React.Component {
  state = {
    postcodes: null,
    pubs: null,
    viewport: {
      latitude: 51.5074,
      longitude: 0.1278,
      zoom: 9
    },
    showPopup: true
  }

  async componentDidMount() {
    try {
      const res = await axios.get('/api/pubs')
      this.setState({ pubs: res.data })
      this.getPostcodes()
    } catch (error) {
      console.log(error)
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
    console.log(res.data.result)

    this.setState({ postcodes: res.data.result })
  }

  render() {
    console.log('pubs', this.state.pubs)
    if (!this.state.pubs) return null
    // const eventArr = this.state.events
    return (
      <section className="event-index-section">

        <h1>Find a pub quiz near you!</h1>
        {/* <div className="container">
          {this.state.pubs.map(pub => (
            <EventCard key={pub._id} {...pub} />
          ))}
        </div> */}
        <PubMap 
          viewport={this.state.viewport} 
          handleGeocoderViewportChange={this.handleGeocoderViewportChange}
          handleViewportChange={this.handleViewportChange} 
          mapboxToken={this.mapboxToken}
          mapRef={this.mapRef} 
          postcodes={this.state.postcodes}
          pubs={this.state.pubs} 
        />
      </section>
    )
  }

}