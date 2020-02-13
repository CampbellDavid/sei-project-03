import React from 'react'
import axios from 'axios'

import ImageUpload from '../common/ImageUpload'

export default class Register extends React.Component {
state = {
  data: {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    favouriteDrinks: '',
    personalityType: '',
    bio: '',
    age: 0,
    gender: '',
    quizStrengths: '',
    profileImage: ''
  }
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
    <section className="form">
      <h1>Register to Comment and rate pubs!</h1>
      <form
        onSubmit={this.handleSubmit}
      >
        <div className="form-div">
          <input
            onChange={this.handleChange}
            placeholder="username"
            name="username" 
            required/>
        </div>
        <div className="form-div">
          <input
            onChange={this.handleChange}
            type="email"
            placeholder="email"
            name="email" 
            required/>
        </div>
        <div className="form-div">
          <input
            onChange={this.handleChange}
            type="password"
            placeholder="password"
            name="password" 
            required/>
        </div>
        <div className="form-div">
          <input
            onChange={this.handleChange}
            type="password"
            placeholder="confirm password"
            name="passwordConfirmation" 
            required/>
        </div>
        <p>If you would like to let fellow team-members know more about you, please fill out the below fields too!</p>
        <div className="form-div">
          <input
            onChange={this.handleChange}
            placeholder="Add Drinks"
            name="favouriteDrinks" />
        </div>
        <div className="form-div">
          <input
            onChange={this.handleChange}
            placeholder="Personality Type"
            name="personalityType" />
        </div>
        <div className="form-div">
          <textarea
            rows="5"
            cols="30"
            onChange={this.handleChange}
            placeholder="Bio"
            name="bio" />
        </div>
        <div className="form-div">
          <input
            type="number"
            onChange={this.handleChange}
            placeholder="Age"
            name="age" />
        </div>
        <div className="form-div">
          <select
            onChange={this.handleChange}
            placeholder="Gender"
            name="gender">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="form-div">
          <input
            onChange={this.handleChange}
            placeholder="Quiz Strengths"
            name="quizStrengths" />
        </div>
        <div className="form-div">
          <ImageUpload
            // labelText="Upload Image"
            handleChange={this.handleChange}
            fieldName="image"/>
        </div>
        <div className="button-div">
          <button
            className="button"
            type="submit">
              Register</button>
        </div>
      </form>
    </section>
  )
}
}