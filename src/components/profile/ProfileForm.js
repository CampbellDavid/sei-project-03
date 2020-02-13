import React from 'react'

const TeamForm = ({ gender, age, favouriteDrinks, quizStrengths, email, bio, personalityType, handleChange, handleSubmit }) => {
  return (
    <div>
      <p>Edit Your Profile:</p>
      <form onSubmit={handleSubmit}>
        <div className="form-div">
          <label>Email:</label>
          <input
            onChange={handleChange}
            placeholder="Email"
            name="email" 
            value={email}
            required/>
        </div>
        <div className="form-div">
          <label>Favorite Drinks:</label>
          <input
            onChange={handleChange}
            placeholder="Favourite Drinks"
            name="favouriteDrinks" 
            value={favouriteDrinks}
            required/>
        </div>
        <div className="form-div">
          <label>Personality Type:</label>
          <input
            onChange={handleChange}
            placeholder="Personality Type"
            name="personalityType" 
            value={personalityType}
            required/>
        </div>

        <div className="form-div">
          <label>Bio:</label>
          <input
            onChange={handleChange}
            placeholder="Bio"
            name="bio" 
            value={bio}
            required/>
        </div>

        <div className="form-div">
          <label>Age:</label>
          <input
            onChange={handleChange}
            placeholder="Age"
            name="age" 
            value={age}
            required/>
        </div>

        <div className="form-div">
          <label>Gender:</label>
          <input
            onChange={handleChange}
            placeholder="Gender"
            name="gender" 
            value={gender}
            required/>
        </div>
       
        <div className="form-div">
          <label>Quiz Strengths:</label>
          <input
            onChange={handleChange}
            placeholder="Quiz Strengths"
            name="quizStrengths" 
            value={quizStrengths}
            required/>
        </div>

        {/* <div className="form-div">
          <label>Profile Image:</label>
          <input
            onChange={handleChange}
            placeholder="Profile Image"
            name="profileImage" 
            value={data.profileImage}
            required/>
        </div> */}

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