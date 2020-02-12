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

        <p>{(this.state.starRatingArr.length === 0) ? 
          null :
          this.state.starRatingArr.reduce((a, b) => {
            console.log('A IS!!:', a)
            console.log('B IS!!:', b)
            console.log('arr length',this.state.starRatingArr.length)
            return (a + b / this.state.starRatingArr.length)
          })}
        </p>
      </>
    )
  }
}

// console.log(this.state.starRating / this.state.starRating.length)

// function average(starRating) {
//   // if (!this.state.starRating) return null

//   return starRating.reduce((a, b) => a + b) / starRating.length
// }

// handleClick = (e) =>  {
//   e.preventDefault()
//   console.log('The link was clicked.')
// }

// handleChange = ({ target: { name, value } }) => {
//   const data = { ...this.state.data, [name]: value }
//   console.log(data)
//   this.setState({ data })
// }

// function reduce(array, combine, start) {
//   let current = start;
//   for (let element of array) {
//     current = combine(current, element);
//   }
//   return current;
// }

//  handleChange = e => {
//   //    const starRating = { ...this.state, [e.target.name]: e.target.value }
//   //    this.setState({ starRating })

//   //  }

// import React, { useState } from 'react'
// import { FaStar } from 'react-icons/fa'

// const StarRating = () => {
//   const [rating,setRating ] = useState(null)
//   const [hover,setHover ] = useState(null)

//   return (<div>
//     {[...Array(5)].map( (star, i) => {
//       const ratingValue = i + 1
//       return (
//         <label key={i}>
//           <input type="radio"
//             name="rating"
//             value={ratingValue }
//             onClick={() => setRating(ratingValue)} />
//           <FaStar color={ratingValue  <=  (hover || rating) ? '#ffc107' : '#e4e5e9' }
//             size ={50}
//             onMouseEnter={() =>setHover(ratingValue)}
//             onMouseLeave={() =>setHover(null)}
//           />
//         </label>
//       )
//     })}
//     <p>Your rating is: {rating}</p>
//   </div>
//   )
// }

// export default StarRating
