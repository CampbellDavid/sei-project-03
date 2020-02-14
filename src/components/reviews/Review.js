import React from 'react'

import ReviewForm from './ReviewForm'
import ReviewItem from './ReviewItem'

export default class Reviews extends React.Component {
  state = {
    reviews: [{}],
    newReview: ''
  }

  handleChange = e => {
    this.setState({ newReview: e.target.value })
  }

  handleSubmit = e => {
    if (!this.state.newReview) return
    e.preventDefault()
    const newReview = { reviews: this.state.newReview }
    const reviews = [...this.state.reviews, newReview]
    this.setState({ reviews, newReview: '' })
  }


  render() {
    console.log(this.state)
    console.log('new', this.state.newReview)
    console.log('new', this.state.reviews)

    return (
      <>
          <p>Leave a review of this pub quiz!</p>
          <ul>
            {this.state.reviews.map((review, i) => (
              <ReviewItem key={i.toString()}
                {...review} 
              />
            ))}
          </ul>
       
          <ReviewForm 
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            newReview={this.state.newReview}
          />
      </>
    )
  }
}