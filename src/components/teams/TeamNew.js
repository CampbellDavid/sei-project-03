import React from 'react'
import axios from 'axios'
import Authorization from '../../../lib/authorization'
import TeamForm from './TeamForm'

export default class TeamNew extends React.Component {
  state = {
    team: {
      captain: '',
      teamName: '',
      event: '',
      members: '',
      user: ''
    }
  }

  handleChange = ({ target: { name, value } }) => {
    const team = { ...this.state.team, [name]: value }
    console.log(team)
    this.setState({ team })
  }

  handleSubmit = async e => {
    e.preventDefault()
    try {
      const eventId = this.props.match.params.id
      const res = await axios.post(`/api/${eventId}/teams`, this.state.team, {
        headers: { Authorization: `Bearer ${Authorization.getToken()}` }
      })
      this.props.history.push(`/events/${eventId}/teams/${res.team._id}`)
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <>
      <p>New Team Page</p>
      <TeamForm 
        team={this.state.team}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}/>
      </>
    )
  }
}