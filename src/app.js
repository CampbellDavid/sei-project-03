import React from 'react'
import ReactDOM from 'react-dom'
import './styles/main.scss'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Nav from './components/common/Nav'
import Home from './components/common/Home'
import PubIndex from './components/pubs/PubIndex'
import EventIndex from './components/events/EventIndex'
import Register from './components/auth/Register'
import Login from './components/auth/Login'


class App extends React.Component {
  render() {
    return (
      <main> 
        <BrowserRouter>   
          <Nav />
          <Switch>
            <Route exact path='/' component={Home}></Route>
            <Route path='/pubs' component={PubIndex}></Route>
            <Route path='/events' component={EventIndex}></Route>
            <Route path='/register' component={Register}></Route>
            <Route path='/login' component={Login}></Route>
          </Switch>
        </BrowserRouter>
      </main>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)


//! PAGES
//* HOME
//TODO COMPONENTS: NAVBAR

//* PUB INDEX
//TODO COMPONENTS: SEARCHBAR, NAVBAR, MAP, FEATURED PUBS(IMPORT FROM PUBCARD COMPONENT), CREATE NEW PUBS BUTTON

//* EVENT INDEX
//TODO COMPONENTS: SEARCHBAR, NAVBAR, MAP, FEATURED PUBS(IMPORT FROM PUBCARD COMPONENT), CREATE NEW EVENTS BUTTON