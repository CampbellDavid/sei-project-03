import React from 'react'
import { Link } from 'react-router-dom'

const PubCard = ({ _id, name, captain, members }) => {
  // handleSubmit = async (e) => {
  //   e.preventDefault()

  // }
  render () {
    return (
      <section className="column">
        <Link to={`/teams/${_id}`}>
          <div>
            <h2 className="header">{name}</h2>
            <ul>
              <li>Captain: {captain}</li>
              <li>Members: {members}</li>
            </ul>
            <form onSubmit={handleSubmit}>
              <button type="submit">Join Team</button>       
            </form>
          </div>

        </Link>
      </section>
  )}
}

export default PubCard