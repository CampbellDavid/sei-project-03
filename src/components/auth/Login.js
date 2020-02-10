import React from 'react'

export default class Login extends React.Component {
state = {
  fields: {
    username: '',
    password: ''
  }
}

handleChange = e => {
  const fields = { ...this.state.fields, [e.target.name]: e.target.value }
  this.setState({ fields })
}

handleClick = e => {
  e.preventDefault
}

render() {
  console.log(this.state.fields)
  return (
    <div>
      <form onClick={this.handleClick}>
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
            Register</button>
        </div>
      </form>
    </div>
  )
}
}