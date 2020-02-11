import 'mapbox-gl/dist/mapbox-gl.css'
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import React from 'react'
import axios from 'axios'
// import MapGL, {  Marker } from 'react-map-gl'
// import Geocoder from 'react-map-gl-geocoder'
import Map from '../common/Map'

// const mapboxToken = process.env.MAPBOX_ACCESS_TOKEN

// import PubCard from './PubCard'
export default class PubIndex extends React.Component {
state = {
  postcodes: [],
  pubs: [],
  viewport: {
    latitude: 51.5074,
    longitude: 0.1278,
    zoom: 9
  }
  // showInfo: false
}

// mapRef = React.createRef()

handleViewportChange = (viewport) => {
  this.setState({
    viewport: { ...this.state.viewport, ...viewport }
  })
}
handleGeocoderViewportChange = (viewport) => {
  // console.log(viewport)
  const geocoderDefaultOverrides = { transitionDuration: 1000 }
  this.setState({ viewport: { latitude: viewport.latitude, longitude: viewport.longitude, zoom: viewport.zoom } })
  // this.apiCall()
  // console.log(this.state.viewport)
  return this.handleViewportChange({
    ...viewport,
    ...geocoderDefaultOverrides
  })
}
async componentDidMount() {
  console.log('hello')
  try {
    const res = await axios.get('/api/pubs')
    this.setState({ pubs: res.data })
    this.getPostcodes()
  } catch (error) {
    console.log(error)
  }
}
async getPostcodes () {
  const postcodes = this.state.pubs.map( pub => pub.postcode)
  const res = await axios.post('https://cors-anywhere.herokuapp.com/api.postcodes.io/postcodes', { postcodes })
  console.log(res.data.result)
  // console.log(postcodes.result)
  this.setState({ postcodes: res.data.result })
}
render() {
  console.log(1)
  if (!this.state.postcodes) return null
  console.log(this.state.postcodes.map(postcode => postcode.result.longitude))
  return (
    <>
      <Map />
    </>
 
     

  )
}
}