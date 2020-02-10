import React from 'react'
import axios from 'axios'

import Authorization from '../../../lib/authorization'

export default class Login extends React.Component {
state = {
  fields: {
    username: '',
    password: ''
  },
  error: ''
}

handleChange = ({ target: { name, value } }) => {
  const fields = { ...this.state.fields, [name]: value }
  this.setState({ fields, error: '' })
}

handleSubmit = async e => {
  e.preventDefault()
  try {
    const res = await axios.post('/api/login', this.state.fields)
    Authorization.setToken(res.data.token)
    this.props.history.push('/profile')
  } catch (error) {
    this.setState({ error: 'Invalid Credentials' })
  }
}

render() {
  console.log(this.state.fields)
  return (
    <div>
      <form onSubmit={this.handleSubmit}>
        <h2>Login Here</h2>
        <div className="form-div">
          <label>Username:</label>
          <input
            placeholder="username"
            name="username" 
            onChange={this.handleChange}/>
        </div>
        <div className="form-div">
          <label>Password:</label>
          <input
            type="password" 
            placeholder="password"
            name="password"
            onChange={this.handleChange} />
        </div>
        <div className="button-div">
          <button
            className="button" 
            type="submit">
            Login</button>
        </div>
      </form>
    </div>
  )
}
}