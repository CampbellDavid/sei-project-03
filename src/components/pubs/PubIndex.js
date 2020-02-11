import 'mapbox-gl/dist/mapbox-gl.css'
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import React from 'react'
import axios from 'axios'
import Geocoder from 'react-map-gl-geocoder'
import MapGL, { Marker } from 'react-map-gl'



const mapboxToken = process.env.MAPBOX_ACCESS_TOKEN

export default class PubIndex extends React.Component {
  state = {
    postcodes: [],
    pubs: [],
    viewport: {
      latitude: 51.5074,
      longitude: 0.1278,
      zoom: 9
    }
  }
  mapboxToken = process.env.MAPBOX_ACCESS_TOKEN
  mapRef = React.createRef()
  handleViewportChange = (viewport) => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    })
    console.log(this.state.viewport)
  }

  handleGeocoderViewportChange = (viewport) => {

    const geocoderDefaultOverrides = { transitionDuration: 1000 }
    this.setState({ ...viewport })
    this.handleViewportChange({ ...viewport, ...geocoderDefaultOverrides })
    
  
  }
  async getPostcodes () {
    const postcodes = this.state.pubs.map( pub => pub.postcode)
    const res = await axios.get('https://cors-anywhere.herokuapp.com/api.postcodes.io/postcodes', { postcodes })
    console.log(res)
    
    this.setState({ postcodes: res.data.result })
  }

  async componentDidMount() {
    console.log('mounting')
    try {
      const res = await axios.get('/api/pubs')
      this.setState({ pubs: res.data })
      this.getPostcodes()
      console.log(this.getPostcodes(), res)
    } catch (error) {
      console.log(error)
    }
  }
  
  render() {
    console.log('rendering')
    if (!this.state.postcodes) return null

    return (



      <MapGL
        mapboxApiAccessToken={mapboxToken}
        ref={this.mapRef}
        {...this.state.viewport}
        height={'50vh'}
        width={'50vw'}
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
      </MapGL>


      
    )
  }
}