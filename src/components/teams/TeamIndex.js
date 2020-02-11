import React from 'react'
import axios from 'axios'
import TeamCard from './TeamCard'


export default class TeamIndex extends React.Component {
  state = {
    teams: null
  }

  async componentDidMount() {
    try {
      const res = await axios.get('/api/teams')
      // console.log(res.data)
      this.setState({ events: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    if (!this.state.events) return null
    // const eventArr = this.state.events
    return (
      <section className="team-index-section">
        <h1>Join a team and have fun!</h1>
        <div className="container">
          {this.state.events.map(team => (
            <TeamCard key={team._id} {...team} />
          ))}
        </div>
      </section>
    )
  }

}