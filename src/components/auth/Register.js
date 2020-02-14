import React from 'react'
import axios from 'axios'

import FormErrors from './FormErrors'
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
  }, 
  emaiValid: false,
  formValid: false,
  passwordValid: false,
  formErrors: { email: '', password: '' }
}

handleChange = e => {
  const name = e.target.name
  const value = e.target.value 
  const data = { ...this.state.data, [name]: value } 
  this.setState({ data },
    () => {
      this.validateField(name, value)
    } )
}


validateField(fieldName, value) {
  let fieldValidationErrors = this.state.formErrors
  let emailValid = this.state.emailValid
  let passwordValid = this.state.passwordValid

  switch (fieldName) {
    case 'email': 
      emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
      fieldValidationErrors.email = emailValid ? '' : ' is invalid'
      break
    case 'password':
      passwordValid = value.length >= 1
      fieldValidationErrors.password  = passwordValid ? '' : ' is too short'
      break
    default: 
      break
  }
  this.setState({
    formErrors: fieldValidationErrors, 
    emailValid: emailValid,
    passwordValid: passwordValid
  }, this.validateForm)
}

validateForm() {
  this.setState({ formValid: this.state.emailValid && this.state.passwordValid })
}

errorClass(error) {
  return (error.length === 0 ? '' : 'has-error')
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

//! register form validation
//* so far we have email that requires email format (i.e., an @ symbol) 
//* emails should be unique, but when someone uses the same email to register, they fail, but there's no error message telling them why they fail to register

render() {
  return (
    <section className="form">
      <h1>Register to Comment and rate pubs!</h1>
      <form
        onSubmit={this.handleSubmit}
      >
        <div className="panel panel-default">
          <FormErrors formErrors={this.state.formErrors} />
        </div>
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
            type="submit" disabled={!this.state.formValid}>
              Register</button>
        </div>
      </form>
    </section>
  )
}
}