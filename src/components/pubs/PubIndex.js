import 'mapbox-gl/dist/mapbox-gl.css'
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import MapComp from '../common/MapComp'
// import SearchBar from '../common/SearchBar'
import PubCard from './PubCard'


export default class PubIndex extends React.Component {
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
  };
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
    // console.log(res.data.result)
    this.setState({ postcodes: res.data.result })
  }
  render() {
    if (!this.state.postcodes) return null
    if (!this.state.pubs) return null
    // console.log('pubs', this.state.pubs)
    // console.log('postcodes', this.state.postcodes)
    return (
      <div className="pub-index-show" >
        <h1>Find a pub quiz near you!</h1>
        {/* <SearchBar /> */}
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
        <section>
          
          <div>
            {this.state.pubs.map(pub => (
              <PubCard key={pub._id} {...pub} />
            ))}
          </div>
          <Link to="/pubs/new">
            <button type="button">New Pub</button>
          </Link>
        </section>
      </div>
    )
  }
}