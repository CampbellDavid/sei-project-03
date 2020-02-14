import React from 'react'

// import ImageUpload from '../common/ImageUpload'

const ProfileForm = ({ user, handleChange, handleSubmit }) => {
  return (
    <section className="form">
      <h1>Edit Your Profile:</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-div">
          <input
            onChange={handleChange}
            placeholder="Email"
            name="email" 
            value={user.email}
          />
        </div>
        <div className="form-div">
          <input
            onChange={handleChange}
            placeholder="Favourite Drinks"
            name="favouriteDrinks" 
            value={user.favouriteDrinks}
          />
        </div>
        <div className="form-div">
          <input
            onChange={handleChange}
            placeholder="Personality Type"
            name="personalityType" 
            value={user.personalityType}
          />
        </div>

        <div className="form-div">
          <input
            onChange={handleChange}
            placeholder="Bio"
            name="bio" 
            value={user.bio}
          />
        </div>

        <div className="form-div">
          <input
            onChange={handleChange}
            placeholder="Age"
            name="age" 
            value={user.age}
          />
        </div>

        <div className="form-div">
          <input
            onChange={handleChange}
            placeholder="Gender"
            name="gender" 
            value={user.gender}
          />
        </div>
       
        <div className="form-div">
          <input
            onChange={handleChange}
            placeholder="Quiz Strengths"
            name="quizStrengths" 
            value={user.quizStrengths}
          />
        </div>
        {/* <div className="form-div">
          <ImageUpload
            // labelText="Upload Image"
            onChange={handleChange}
            fieldName="image"/>
        </div> */}

        {/* <div className="form-div">
          <label>Profile Image:</label>
          <input
            onChange={handleChange}
            placeholder="Profile Image"
            name="profileImage" 
            value={user.profileImage}
            required/>
        </div> */}

        <div className="button-div">
          <button
            className="button"
            type="submit">
              Submit</button>
        </div>
      </form>
    </section>
  )
}

export default ProfileForm

// TODO: add coontrol field