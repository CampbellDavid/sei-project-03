import React, { Component } from 'react'

import BeautyStars from 'beauty-stars'

export default class App extends Component {
  state = {
    starRatingVal: null,
    starRatingArr: [0]
  };

  render() {
    console.log(this.state.starRatingArr)
    console.log(this.state.starRatingArr.length)

    return (
      <>
        <BeautyStars
          value={this.state.starRating}
          onChange={starRating => {
            this.state.starRatingArr.push(starRating)
            this.setState({ starRatingVal: starRating })
            console.log(typeof starRating)
          }}
        />

        <p>{
          (this.state.starRatingArr.length === 0) ? 
            null :
            Math.round(this.state.starRatingArr.reduce((a, b) => {
              return (a + b / this.state.starRatingArr.length)
            }))
        }
        </p>
      </>
    )
  }
}