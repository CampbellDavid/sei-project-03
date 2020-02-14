import React from 'react'

const ReviewForm = ({ handleChange, handleSubmit, newReview }) => {
  return (
    <form onSubmit={handleSubmit}>
      <textarea
        rows="5"
        cols="30"
        placeholder="Leave your review here" 
        onChange={handleChange} 
        value={newReview}
      />
      <button className="button">Comment</button>
    </form>
  )
}

export default ReviewForm