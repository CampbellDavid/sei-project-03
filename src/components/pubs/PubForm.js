import React from 'react'

import ImageUpload from '../common/ImageUpload'


const PubForm = ({ data, handleChange, handleSubmit }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-div">
          <label>Pub Name:</label>
          <input
            onChange={handleChange}
            placeholder="Pub Name"
            name="name" 
            value={data.name}
            required/>
        </div>
        <div className="form-div">
          <label>Street Address:</label>
          <input
            onChange={handleChange}
            placeholder="Street Address"
            name="streetName" 
            value={data.streetName}
            required/>
        </div>
        <div className="form-div">
          <label>City:</label>
          <input
            onChange={handleChange}
            placeholder="City"
            name="city" 
            value={data.city}
            required/>
        </div>
        <div className="form-div">
          <label>Postcode:</label>
          <input
            onChange={handleChange}
            placeholder="Postcode"
            name="postcode" 
            value={data.postcode}
            required/>
        </div>
        <div className="form-div">
          <label>Phone Number:</label>
          <input
            onChange={handleChange}
            placeholder="Phone Number"
            name="phone" 
            value={data.phone}
          />
        </div>
        <div className="form-div">
          <label>Website:</label>
          <input
            onChange={handleChange}
            placeholder="Website"
            name="website" 
            value={data.website}
          />
        </div>
        <div className="form-div">
          <label>Pub Description:</label>
          <input
            onChange={handleChange}
            placeholder="Pub Description"
            name="description" 
            value={data.description}
          />
        </div>
        <div className="form-div">
          <label>Max. Team Size:</label>
          <input
            type="number"
            onChange={handleChange}
            placeholder="Max. Team Size"
            name="maxTeamSize" 
            value={data.maxTeamSize}
            required/>
        </div>
        <div className="form-div">
          <label>Quiz Day:</label>
          <input
            onChange={handleChange}
            placeholder="Quiz Day"
            name="quizDay" 
            value={data.quizDay}
            required/>
        </div>
        <div className="form-div">
          <label>Quiz Time:</label>
          <input
            type="time"
            onChange={handleChange}
            placeholder="Quiz Time"
            name="quizTime" 
            value={data.quizTime}
            required/>
        </div>
        <div className="form-div">
          <label>Average Pint Cost:</label>
          <input
            onChange={handleChange}
            placeholder="Average Pint Cost"
            name="averagePintCost" 
            value={data.averagePintCost}
            required/>
        </div>
        <div className="form-div">
          <ImageUpload
            labelText="Upload Image"
            handleChange={handleChange}
            fieldName="image"/>
        
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

export default PubForm



