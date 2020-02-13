import React from 'react'
import axios from 'axios'
import Authorization from '../../../lib/authorization'
import TeamForm from './TeamForm'

export default class TeamNew extends React.Component {
  state = {
    data: {
      captain: '',
      teamName: '',
      event: '',
      members: '',
      user: ''
    }
  }

  handleChange = ({ target: { name, value } }) => {
    const data = { ...this.state.data, [name]: value }
    console.log(data)
    this.setState({ data })
  }

  handleSubmit = async e => {
    e.preventDefault()
    try {
      const eventId = this.props.match.params.id
      const res = await axios.post(`/api/${eventId}/teams`, this.state.data, {
        headers: { Authorization: `Bearer ${Authorization.getToken()}` }
      })
      this.props.history.push(`/events/${res.data._id}`)
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <>
      <h1>New Team Page</h1>
      <TeamForm 
        data={this.state.data}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}/>
      </>
    )
  }
}