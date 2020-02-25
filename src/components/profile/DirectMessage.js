
//! PLANNING FOR DIRECT MESSAING 

// user authentication 
// how to use pusher 
// text update
// record saving 

import React from 'react'
import dmButton from './dmButton'
import Login from '../auth/Login'
import { default as Chatkit } from '@pusher/chatkit-server'


const chatkit = new Chatkit ({
  instanceLocator: 'v1:us1:3c6a37e8-44ed-4205-a9ef-6436d4040ac3', 
  key: 'a5c740d3-c7a4-4bec-aefb-37f0147b6efe:27SR0W/U2h9HDoP49E9r1ti4hlRl+hm0u0fM/5522M4='
})

class DirectMessage extends React.Component {
  state = {
    currentView: 'currentView'
  }
  changeView(view) {
    this.setState({ currentView: view })
  }
  render() {
    let view = ''
    if (this.state.currentView === 'dmButton') {
      view = <dmButton changeView={this.changeView} />
    } else if (this.state.currentview === 'Login') {
      view = <Login />
    }
    return (
      <div>{view}</div>
    ) 
  }
}

export default DirectMessage 