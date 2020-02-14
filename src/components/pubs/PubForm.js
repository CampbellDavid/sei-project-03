import React from 'react'

import ImageUpload from '../common/ImageUpload'


const PubForm = ({ data, handleChange, handleSubmit }) => {
  return (
    <section className="form">
      <form onSubmit={handleSubmit}>
        <div className="form-div">
          <input
            onChange={handleChange}
            placeholder="Pub Name"
            name="name" 
            value={data.name}
            required/>
        </div>
        <div className="form-div">
          <input
            onChange={handleChange}
            placeholder="Street Address"
            name="streetName" 
            value={data.streetName}
            required/>
        </div>
        <div className="form-div">
          <input
            onChange={handleChange}
            placeholder="City"
            name="city" 
            value={data.city}
            required/>
        </div>
        <div className="form-div">
          <input
            onChange={handleChange}
            placeholder="Postcode"
            name="postcode" 
            value={data.postcode}
            required/>
        </div>
        <div className="form-div">
          <input
            onChange={handleChange}
            placeholder="Phone Number"
            name="phone" 
            value={data.phone}
          />
        </div>
        <div className="form-div">
          <input
            onChange={handleChange}
            placeholder="Website"
            name="website" 
            value={data.website}
          />
        </div>
        <div className="form-div">
          <input
            onChange={handleChange}
            placeholder="Pub Description"
            name="description" 
            value={data.description}
          />
        </div>
        <div className="form-div">
          <input
            type="number"
            onChange={handleChange}
            placeholder="Max. Team Size"
            name="maxTeamSize" 
            value={data.maxTeamSize}
            required/>
        </div>
        <div className="form-div">
          <input
            onChange={handleChange}
            placeholder="Quiz Day"
            name="quizDay" 
            value={data.quizDay}
            required/>
        </div>
        <div className="form-div">
          <input
            type="time"
            onChange={handleChange}
            placeholder="Quiz Time"
            name="quizTime" 
            value={data.quizTime}
            required/>
        </div>
        <div className="form-div">
          <input
            onChange={handleChange}
            placeholder="Average Pint Cost"
            name="averagePintCost" 
            value={data.averagePintCost}
            required/>
        </div>
        <div className="form-div">
          <label>* required field</label>
          <ImageUpload
            labelText="Upload Image"
            handleChange={handleChange}
            fieldName="image"
            required/>
        
        </div>
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

export default PubForm



