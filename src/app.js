import React from 'react'
import ReactDOM from 'react-dom'
import './styles/main.scss'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Nav from './components/common/Nav'
import Home from './components/common/Home'

import PubEdit from './components/pubs/PubEdit'
import PubNew from './components/pubs/PubNew'
import PubShow from './components/pubs/PubShow'
import PubIndex from './components/pubs/PubIndex'

import EventEdit from './components/events/EventEdit'
import EventNew from './components/events/EventNew'
import EventShow from './components/events/EventShow'
import EventIndex from './components/events/EventIndex'

import Register from './components/auth/Register'
import Login from './components/auth/Login'

import TeamIndex from './components/teams/TeamIndex'
import Unknown from './components/common/Unknown'
import Profile from './components/profile/Profile'
<<<<<<< HEAD
// import StarRating from './components/common/StarRating'
=======

//edit
//new
//show
//index
>>>>>>> 7ff676b9eb93c85112330d490c9cf3188243823e

class App extends React.Component {
  render() {
    return (
      <main> 
        <BrowserRouter>   
          <Nav />
          <Switch>
            <Route exact path='/' component={Home}></Route>
<<<<<<< HEAD
            {/* <Route path='/' component={StarRating}></Route> */}
=======

            <Route path='/pubs/:id/edit' component={PubEdit}></Route>
            <Route path='/pubs/new' component={PubNew}></Route>
>>>>>>> 7ff676b9eb93c85112330d490c9cf3188243823e
            <Route path='/pubs/:id' component={PubShow}></Route>
            <Route path='/pubs' component={PubIndex}></Route>

            <Route path='/profiles/:id' component={Profile}></Route>

            <Route path='/events/:id/edit' component={EventEdit}></Route>
            <Route path='/events/new' component={EventNew}></Route>
            <Route path='/events/:id' component={EventShow}></Route>
            <Route path='/events' component={EventIndex}></Route>

            <Route path='/register' component={Register}></Route>
            <Route path='/login' component={Login}></Route>
            {/* //! XW: TEST ROUTE; DELETE LATER */}
            <Route path='/teams' component={TeamIndex}></Route>
            <Route path='/*' component={Unknown}></Route>
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