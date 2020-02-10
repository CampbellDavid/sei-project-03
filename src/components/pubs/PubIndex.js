import 'mapbox-gl/dist/mapbox-gl.css'
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import React from 'react'
import axios from 'axios'
import MapGL, {  Marker, Popup } from 'react-map-gl'
import Geocoder from 'react-map-gl-geocoder'

const mapboxToken = process.env.MAPBOX_ACCESS_TOKEN

// import PubCard from './PubCard'

export default class PubIndex extends React.Component {
state = {
  postcodes: [],
  pubs: [],
  viewport: {
    latitude: 51.5074,
    longitude: 0.1278,
    zoom: 9
  },
  showInfo: false
}

mapRef = React.createRef()
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

      {/* {this.state.postcodes.map(postcode => {
        if (this.state.showInfo)
          return (
            <Popup
              tipSize={5}
              anchor="bottom-right"
              closeButton={false}
              closeOnClick={true}
              onClose={ ()=> this.setState({ showInfo: false }) }
              latitude={postcode.result.latitude}
              longitude={postcode.result.longitude}>
              <p>Pop Up Works</p>

            </Popup> 
          //if pub has the same post code as one of the post code = post.query and thehn map all the stuff you ant from the obj
          )
      })} */}
     
    </MapGL>
  )
}
}



