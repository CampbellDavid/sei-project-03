import React from 'react'
import ReactDOM from 'react-dom'
import './styles/main.scss'
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom'


class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <main>
          <h1>Inquizitour🍺🍺🍺🍺</h1>
          {/* <nav className='navbar'>
            <Link to='/'>Home</Link>
            <Link to='/pubs'>Find a pub!</Link>
            <Link to='/events'>Find a quiz!</Link>
            <Link to='/register'>Register</Link>
          </nav>
          <Switch>
            <Route exact path='/' component={Home}></Route>
            <Route path='/pubs' component={PubIndex}></Route>
            <Route path='/events' component={EventIndex}></Route>
            <Route path='/register' component={Register}></Route>
          </Switch> */}
        </main>
      </BrowserRouter>
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