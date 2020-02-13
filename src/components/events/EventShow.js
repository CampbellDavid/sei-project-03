import React from 'react'
import axios from 'axios'
import TeamCard from '../teams/TeamCard'
import TeamNew from '../teams/TeamNew'
import { Link } from 'react-router-dom'

export default class EventShow extends React.Component {
  state = {
    event: null,
    teams: null
  }

  async componentDidMount() {
    try {

      const eventId = this.props.match.params.id
      await axios.all([
        axios.get(`/api/events/${eventId}`),
        axios.get(`/api/events/${eventId}/teams`)
      ])

        .then(axios.spread((eventReq, teamsReq) => {
          this.setState({
            event: eventReq.data,
            teams: teamsReq.data
          })

        }))

    } catch (error) {
      console.log(error)
    }
  }



  render() {
    if (!this.state.event) return null
    const eventId = this.props.match.params.id
    console.log(this.state.event)
    console.log(this.state.teams)
    return (
      <>
        <h1>{this.state.event.entryFee}</h1>
        {this.state.teams.teams.map(team => <TeamCard key={team._id} {...team} />)}
        <Link to={`/events/${eventId}/teams/new`}>
          <button type="button">New Team</button>
        </Link>
      </>
    )
  }
}

// double embedded 'teams' - try to fix in back end.. works so leave til end