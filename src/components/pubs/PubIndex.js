import React from 'react'
import axios from 'axios'
import 'mapbox-gl/mapbox-gl.css'  
import 'react-map-gl-geocoder/mapbox-gl-geocoder.css'
// import MapGL, {  Marker, Popup } from 'react-map-gl'
// import Geocoder from 'react-map-gl-geocoder'

// const mapboxToken = process.env.MAPBOX_ACCESS_TOKEN

// import PubCard from './PubCard'

export default class PubIndex extends React.Component {
state = {
  pubs: [],
  viewport: {
    latitude: 51.5074,
    longitude: 0.1278,
    zoom: 7
  }
}

async componentDidMount() {
  try {
    const res = await axios.get('/api/pubs')
    console.log(res.data)
    this.setState({ pubs: res.data })

  } catch (error) {
    console.log(error)
  }
}

mapRef = React.createRef()
  handleViewportChange = (viewport) => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    })
  }

  handleGeocoderViewportChange = (viewport) => {
    console.log(viewport)
    const geocoderDefaultOverrides = { transitionDuration: 3000 }
    this.setState({ viewport: { latitude: viewport.latitude, longitude: viewport.longitude, zoom: viewport.zoom } })
    // this.apiCall()
    console.log(this.state.viewport)
    return this.handleViewportChange({
      ...viewport,
      ...geocoderDefaultOverrides
    })
  }



  render() {
    return (
      <h1>Pub Index Page</h1>
    )
  }
}