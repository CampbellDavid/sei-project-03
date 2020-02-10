import React from 'react'
import axios from 'axios'
import 'mapbox-gl/dist/mapbox-gl.css'
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import MapGL, {  Marker } from 'react-map-gl'
import Geocoder from 'react-map-gl-geocoder'

const mapboxToken = process.env.MAPBOX_ACCESS_TOKEN

import PubCard from './PubCard'

export default class PubIndex extends React.Component {
state = {
  postcodes: [],
  viewport: {
    latitude: 51.5074,
    longitude: 0.1278,
    zoom: 7
  }
}

async componentDidMount() {
  try {
    const res = await axios.get(`/api/pubs/${postcode}`)
    console.log(res.data)
    this.setState({ postcodes: res.data })

  } catch (error) {
    console.log(error)
  }
}

render() {
  console.log(1)
  if (!this.state.postcodes) return null
  console.log(this.state.postcodes.map(postcode => postcode.result.longitude))
  return (
    <MapGL
      mapboxApiAccessToken={mapboxToken}
      ref={this.mapRef}
      {...this.state.viewport}
      height={'100vh'}
      width={'100vw'}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      // zoom={10}
      // latitude= {51.5074}
      // longitude= {0.1278}
      onViewportChange={this.handleViewportChange}>
      <Geocoder
        mapRef={this.mapRef}
        onViewportChange={this.handleGeocoderViewportChange}
        mapboxApiAccessToken={mapboxToken}
      />
      
      {this.state.postcodes.map((postcode, index) => {
        return <Marker
          key={index.toString()}
          latitude={postcode.result.latitude}
          longitude={postcode.result.longitude} >
          <div className="marker">
            
          </div>
        </Marker>
      } )}



  render() {
    if (!this.state.postcodes) return null
    return (
      <MapGL
        mapboxApiAccessToken={mapboxToken}
        ref={this.mapRef}
        {...this.state.viewport}
        height={'100vh'}
        width={'100vw'}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={this.handleViewportChange}
      >
        <Geocoder
          mapRef={this.mapRef}
          onViewportChange={this.handleGeocoderViewportChange}
          mapboxApiAccessToken={mapboxToken}
        />
        {this.state.postcodes.map((postcode, index) => {
          return <Marker
            key={index}
            latitude={parseFloat(postcode.location.latitude)}
            longitude={parseFloat(postcode.location.longitude)}   
          >
            <div className="marker"/>      
          </Marker>
        } )}

      </MapGL>
    )
  }
}

// apiCall = async ()=> {
//   try {
//     const response =  await axios.get(`https://data.police.uk/api/crimes-street/all-crime?lat=${this.state.viewport.latitude}&lng=${this.state.viewport.longitude}`)
//     const data = response.data
//     // console.log(data, 'data')
//     // .filter(point => !isNaN(point.longitude) || !isNaN(point.longitude))
//     this.setState({ crimes: data })
//   } catch (err) {
//     console.log(err)
//   }
// }
// async componentDidMount() {  
//   this.apiCall()
// }