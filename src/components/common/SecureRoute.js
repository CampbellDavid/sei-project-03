import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Authorization from '../../../lib/authorization'

const SecureRoute = ({ component: Component, ...rest }) => {
  if (Authorization.isAuthenticated()) return <Route {...rest} component={Component} />
  Authorization.logout()
  return <Redirect to="/login" />
}

export default SecureRoute