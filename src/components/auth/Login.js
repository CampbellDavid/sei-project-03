import React from 'react'
import axios from 'axios'

import Authorization from '../../../lib/authorization'

export default class Login extends React.Component {
state = {
  data: {
    email: '',
    password: ''
  },
  error: ''
}

handleChange = ({ target: { name, value } }) => {
  const data = { ...this.state.data, [name]: value }
  this.setState({ data, error: '' })
}

handleSubmit = async e => {
  e.preventDefault()
  try {
    const res = await axios.post('/api/login', this.state.data)
    Authorization.setToken(res.data.token)
    console.log(res.data)
    this.props.history.push('/profiles/:id')
  } catch (error) {
    this.setState({ error: 'Invalid Credentials' })
  }
}

render() {
  // console.log(this.state.data)
  return (
    <div>
      <form onSubmit={this.handleSubmit}>
        <h2>Login Here</h2>
        <div className="form-div">
          <label>Email:</label>
          <input
            placeholder="email"
            name="email" 
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