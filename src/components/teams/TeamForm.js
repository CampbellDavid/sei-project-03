import React from 'react'

const TeamForm = ({ data, handleChange, handleSubmit }) => {
  return (
    <div>
      <h1>Create a new team for this event!</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-div">
          <label>Event:</label>
          <input
            onChange={handleChange}
            placeholder="Event Name"
            name="event" 
            value={data.event}
            required/>
        </div>
        <div className="form-div">
          <label>Captain:</label>
          <input
            onChange={handleChange}
            placeholder="Captain"
            name="captain" 
            value={data.captain}
            required/>
        </div>
        <div className="form-div">
          <label>Team Name:</label>
          <input
            onChange={handleChange}
            placeholder="Team Name"
            name="teamName" 
            value={data.teamName}
            required/>
        </div>
       
        <div className="button-div">
          <button
            className="button"
            type="submit">
              Submit</button>
        </div>
      </form>
    </div>
  )
}

export default TeamForm