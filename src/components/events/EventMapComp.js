import 'mapbox-gl/dist/mapbox-gl.css'
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import React from 'react'
import MapGL, { Marker } from 'react-map-gl'
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
          <button className="marker">
            {events.map((event, i) => {
              return event.postcode === postcode.query ? (
                <Link key={i} to={`/events/${event._id}`}>
                  <div>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Icon-round-Question_mark.svg/1200px-Icon-round-Question_mark.svg.png" />
                    <p className="event-map-name">{event.pub}</p>
                  </div>
                </Link>
              ) : null
            })}
          </button>
        </Marker>
      )
    })}
    
  </MapGL>
)
export default MapComp
