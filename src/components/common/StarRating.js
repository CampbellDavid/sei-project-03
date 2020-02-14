import React, { Component } from 'react'

import BeautyStars from 'beauty-stars'

export default class App extends Component {
  state = {
    starRatingVal: null,
    starRatingArr: [0]
  };

  render() {
    // console.log(this.state.starRatingArr)
    // console.log(this.state.starRatingArr.length)

    return (
      <>
        <BeautyStars
          value={this.state.starRating}
          // inactiveColor={'#121621'}
          // activeColor={'#FFED76'}
          onChange={starRating => {
            this.state.starRatingArr.push(starRating)
            this.setState({ starRatingVal: starRating })
            // console.log(typeof starRating)
          }}
        />

        <p>Average rating is: {
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

// import React, { Component } from 'react'

// import BeautyStars from 'beauty-stars'

// export default class App extends Component {
//   state = { value: 0 };
//   render() {
//     return (
//       <BeautyStars
//         value={this.state.value}
//         onChange={value => this.setState({ value })}
//       />
//     )
//   }
// }