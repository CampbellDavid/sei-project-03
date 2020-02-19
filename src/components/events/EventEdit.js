import React from 'react'
import axios from 'axios'
import Authorization from '../../../lib/authorization'
import EventForm from './EventForm'

export default class EventEdit extends React.Component {
  state = {
    data: {
      pub: '',
      entryFee: '',
      quizDay: '',
      quizTime: ''
    }
  }

  async componentDidMount() {
    const eventId = this.props.match.params.id
    try {
      const res = await axios.get(`/api/events/${eventId}`)
      this.setState({ data: res.data })
    } catch (error) {
      console.log(error)
    }
  }

  handleChange = ({ target: { name, value } }) => {
    const data = { ...this.state.data, [name]: value }
    this.setState({ data })
  }

  handleSubmit = async e => {
    e.preventDefault()
    const eventId = this.props.match.params.id
    try {
      const { data } = await axios.put(`/api/events/${eventId}`, this.state.data, {
        headers: { Authorization: `Bearer ${Authorization.getToken()}` }
      })
      this.props.history.push(`/events/${data._id}`)
    } catch (error) {
      console.log(error)
    }
  }


  render() {
    return (
      <EventForm
        data={this.state.data}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit} />
    )
  }
}