import React from 'react'
import axios from 'axios'

export default class Register extends React.Component {
state = {
  data: {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  }

  handleChange = e => {
    const data = { ...this.state.data, [e.target.name]: e.target.value } 
    this.setState({ data })
  }

  handleSubmit = async e => {
    e.preventDefault()
    try {
      await axios.post('/api/register', this.state.data)
      this.props.history.push('/login')
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <div>
        <form 
          onSubmit={this.handleSubmit}
        >
          <h2>Register to Comment</h2>
          <div className="form-div">
            <label>Username:</label>
            <input
              onChange={this.handleChange} 
              placeholder="username"
              name="username" />
          </div>
          <div className="form-div">
            <label>Email:</label>
            <input
              onChange={this.handleChange} 
              type="email" 
              placeholder="email"
              name="email" />
          </div>
          <div className="form-div">
            <label>Password:</label>
            <input
              onChange={this.handleChange} 
              type="password" 
              placeholder="password"
              name="password" />
          </div>
          <div className="form-div">
            <label>Confirm Password:</label>
            <input
              onChange={this.handleChange} 
              type="password" 
              placeholder="confirm password"
              name="passwordConfirmation" />
          </div>
          <div className="button-div">
            <button
              className="button" 
              type="submit">
              Register</button>
          </div>
        </form>
      </div>
    )
  }
}