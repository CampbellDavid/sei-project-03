import React from 'react'

const EventForm = ({ data, handleChange, handleSubmit }) => {
  return (
    <div>
      <h1>Create a new quiz event at this pub!</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-div">
          <input
            onChange={handleChange}
            placeholder="Pub"
            name="pub"
            value={data.pub}
            required />
        </div>
        <div className="form-div">
          <input
            onChange={handleChange}
            placeholder="£"
            name="entryFee"
            value={data.entryFee}
            required />
        </div>
        <div className="form-div">
          <input
            onChange={handleChange}
            type="date"
            placeholder="DD/MM/YY"
            name="quizDay"
            value={data.quizDay}
            required />
        </div>
        <div className="form-div">
          <input
            type="time"
            onChange={handleChange}
            placeholder="Time"
            name="quizTime"
            value={data.quizTime}
            required />
        </div>
        <div className="form-div">
          <input
            onChange={handleChange}
            placeholder="Postcode"
            name="postcode"
            value={data.postcode}
            required />
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

export default EventForm