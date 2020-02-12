import React from 'react'


const PubForm = ({ data, handleChange, handleSubmit }) => {
  return (
    <div>
      <h1>Create a new quiz event at this pub!</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-div">
          <label>Pub Name:</label>
          <input
            onChange={handleChange}
            placeholder="Pub"
            name="pub" 
            value={data.pub}
            required/>
        </div>
        <div className="form-div">
          <label>Entry Fee:</label>
          <input
            onChange={handleChange}
            placeholder="£"
            name="entryFee" 
            value={data.entryFee}
            required/>
        </div>
        <div className="form-div">
          <label>Date of Quiz:</label>
          <input
            onChange={handleChange}
            type="date"
            placeholder="DD/MM/YY"
            name="quizDay" 
            value={data.quizDay}
            required/>
        </div>
        <div className="form-div">
          <label>Time of Quiz:</label>
          <input
            type="time"
            onChange={handleChange}
            placeholder="Time"
            name="quizTime" 
            value={data.quizTime}
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

export default PubForm