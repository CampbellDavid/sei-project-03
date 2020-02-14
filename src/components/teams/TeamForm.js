import React from 'react'

const TeamForm = ({ handleChange, handleSubmit }) => {
  return (
    <div>
      <h1>Create a new team for this event!</h1>
      <form onSubmit={handleSubmit}>
        
        <div className="form-div">
          <label>Team Name:</label>
          <input
            onChange={handleChange}
            placeholder="Team Name"
            name="teamName"
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