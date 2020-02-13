import 'mapbox-gl/dist/mapbox-gl.css'
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import React from 'react'
import MapGL, { Marker, Popup } from 'react-map-gl'
import Geocoder from 'react-map-gl-geocoder'
import { Link } from 'react-router-dom'
// const mapboxToken = process.env.MAPBOX_ACCESS_TOKEN
// const mapRef = React.createRef()
const MapComp = ({
  viewport,
  handleGeocoderViewportChange,
  handleViewportChange,
  mapboxToken,
  mapRef,
  postcodes,
  events
}) => (
  <MapGL
    mapboxApiAccessToken={mapboxToken}
    ref={mapRef}
    {...viewport}
    height={'100vh'}
    width={'100vw'}
    mapStyle="mapbox://styles/mapbox/streets-v11"
    onViewportChange={handleViewportChange}
  >
    <Geocoder
      mapRef={mapRef}
      onViewportChange={handleGeocoderViewportChange}
      mapboxApiAccessToken={mapboxToken}
    />
   

    {postcodes.map((postcode, index) => {
      return (
        <Marker
          key={index}
          latitude={postcode.result.latitude}
          longitude={postcode.result.longitude}
        >
          {/* <button className="marker"> */}
          {events.map((event, i) => {
            return event.postcode === postcode.query ? (
                
              <div key={i} >
                {/* <img src="https://cdn3.iconfinder.com/data/icons/project-management-32/48/37-512.png" />
                    <img src="https://image.flaticon.com/icons/png/512/36/36601.png" />
                    <p> {event.pub} </p> */}
                  
                <Popup
                  tipSize={12}
                  anchor="bottom"
                  latitude={postcode.result.latitude}
                  longitude={postcode.result.longitude}>
                  <p>{event.pub}</p>
                </Popup>
              </div>
                
            ) : null
          })}
          {/* </button> */}
        </Marker>
      )
    })}
    
  </MapGL>
)
export default MapComp





{/* <Link key={i} to={`/events/${event._id}`}>
<div>
  <img src="https://cdn3.iconfinder.com/data/icons/project-management-32/48/37-512.png" />
  <img src="https://image.flaticon.com/icons/png/512/36/36601.png" />
  <p> {event.pub} </p>

  <Popup
    key={i} 
    tipSize={12}
    anchor="bottom"
    latitude={postcode.result.latitude}
    longitude={postcode.result.longitude}>
    <p>text</p>
  </Popup>
</div>
</Link> */}