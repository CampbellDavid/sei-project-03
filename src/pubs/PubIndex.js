import React, { Component } from 'react'
import axios from 'axios'
import 'mapbox-gl/dist/mapbox-gl.css'  
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import MapGL, {  Marker, Popup } from 'react-map-gl'
import Geocoder from 'react-map-gl-geocoder'

const mapboxToken = process.env.MAPBOX_ACCESS_TOKEN

import PubCard from '../pubs/PubCard'

export default class PubIndex extends React.Component {
state = {
  pubs: []
}

aysnc componentDidMount() {
  
}

render() {
  return (
    <h1>Pub Index Page</h1>
  )
}
}