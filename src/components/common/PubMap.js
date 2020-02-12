
import 'mapbox-gl/dist/mapbox-gl.css'
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import React from 'react'

import MapGL, { Marker } from 'react-map-gl'
import Geocoder from 'react-map-gl-geocoder'
import { Link } from 'react-router-dom'

// const mapboxToken = process.env.MAPBOX_ACCESS_TOKEN
// const mapRef = React.createRef()

const PubMap = ({ viewport, handleGeocoderViewportChange, handleViewportChange, mapboxToken, mapRef, postcodes, pubs  }) => (
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
            {pubs.map((pub, i) => {
              return pub.postcode === postcode.query ? (
                <Link key={i} to={`/pubs/${pub._id}`}>
                  <div>
                    <img src={pub.image} />
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
  

export default PubMap

