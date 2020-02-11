import 'mapbox-gl/dist/mapbox-gl.css'
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import React from 'react'
// import axios from 'axios'
import MapGL, {  Marker } from 'react-map-gl'
import Geocoder from 'react-map-gl-geocoder'
const mapboxToken = process.env.MAPBOX_ACCESS_TOKEN
const Map = ({ handleViewportChange, handleGeocoderViewportChange }) => {
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
      onViewportChange={handleViewportChange}>
      <Geocoder
        mapRef={React.createRef()}
        onViewportChange={handleGeocoderViewportChange}
        mapboxApiAccessToken={mapboxToken}
      />
      {this.state.postcodes.map((postcode, index) => {
        return <Marker
          key={index.toString()}
          latitude={postcode.result.latitude}
          longitude={postcode.result.longitude} >
          <button className="marker">
            {/* <img src={this.state.image} /> */}
            <img src="https://d2kdkfqxnvpuu9.cloudfront.net/images/big/47455.jpg?1319388226" />
          </button>
        </Marker>
      } )}
    </MapGL> 
  )
}
export default Map