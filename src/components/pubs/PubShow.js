import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import StarRating from '../common/StarRating'

import Authorization from '../../../lib/authorization'

export default class PubShow extends React.Component {
  state = {
    pub: null,
    text: '',
    errors: {}
  }

  async componentDidMount() {
    const pubId = this.props.match.params.id
    try {
      const res = await axios.get(`/api/pubs/${pubId}`)
      console.log(res.data)
      this.setState({ pub: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  handleDelete = async () => {
    const pubId = this.props.match.params.id
    try {
      await axios.delete(`/api/pubs/${pubId}`, {
        headers: { Authorization: `Bearer ${Authorization.getToken()}` }
      })
      this.props.history.push('/pubs')
    } catch (err) {
      this.props.history.push('/unknown')
    }
  }

  handleDeleteReview = async (e) => {
    e.preventDefault()
    const pubId = this.props.match.params.id
    console.log('ID', e.target.name)
    const reviewId = e.target.name
    console.log(reviewId)
    try {
      await axios.delete(`/api/pubs/${pubId}/reviews/${reviewId}`, {
        headers: { Authorization: `Bearer ${Authorization.getToken()}` }
      })
    } catch (err) {
      console.log(err)
    }
    this.componentDidMount()
  }

  handleSubmitReview = async (event) => {
    event.preventDefault()
    const pubId = this.props.match.params.id
    try {
      await axios.post(`/api/pubs/${pubId}/reviews`, { text: this.state.text }, {
        headers: { Authorization: `Bearer ${Authorization.getToken()}` }
      })
      this.setState({ text: '' })
    } catch (err) {
      this.setState({ errors: err.response.data.errors })
    }
    this.componentDidMount()
  }

  handleChange = e => {
    const text = e.target.value
    this.setState({ text })
  }

  isPubOwner = () => {
    return Authorization.getPayload().sub === this.state.pub.user._id
  }

  render() {
    if (!this.state.pub) return null
    const { pub, text } = this.state
    const pubId = this.props.match.params.id
    console.log(this.state.pub.reviews.length)
    return (
      <>
        <div className="pub-show">

          <div className="pub-info">
            <h1>{pub.name}</h1>
            {/* <h2>{pub.starRating}</h2> */}
            <figure className="pub-image">
              <img src={pub.image} />
            </figure>
            <p>{pub.description}</p>
            <a href={pub.website}>Visit Pub Website</a>

            {Authorization.isAuthenticated() ?
              <div>
                <Link to="/events/new">
                  <button
                    className="button"
                    type="button">New Event</button>
                </Link>

                {this.isPubOwner() &&
                  <div>
                    <Link to={`/pubs/${pubId}/edit`}>
                      <button
                        className="button"
                        type="button">Edit Pub</button>
                    </Link>
                    <button className="button" onClick={this.handleDelete}>Delete Pub</button>
                  </div>}


              </div>
              : null}


          </div>

          <div className="sidebar">
            <div className="address">
              <h2>Address Info:</h2>
              <p>{pub.streetName}</p>
              <p>{pub.city}</p>
              <p>{pub.postcode}</p>
              <p>{pub.phone}</p>
            </div>

            <div className="quiz-info">
              <h2>Quiz Info:</h2>
              <p>Maximum Team size: {pub.maxTeamSize}</p>
              <p>Day of Quiz: {pub.quizDay}</p>
              <p>Time of Quiz: {pub.quizTime}</p>
              <p>Average Cost of a Pint: {pub.averagePintCost}</p>
            </div>
          </div>

          <div className="reviews">
            <ul>{pub.reviews.length < 1 ?
              null :
              pub.reviews.map(review => (
                <li key={review._id}>
                  {review.text}

                  <button
                    onClick={this.handleDeleteReview}
                    name={review._id}
                    type="submit"
                    className="button">
                    Delete</button>
                </li>))}
            </ul>
          </div>

          {Authorization.isAuthenticated() && <form onSubmit={this.handleSubmitReview}>
            <div>
              <label>Review</label>
              <div>
                <textarea
                  className="textarea"
                  placeholder="Add a review"
                  onChange={this.handleChange}
                  value={text}
                />
              </div>
            </div>
            <div>
              <div>
                <button type="submit">Add</button>
              </div>
            </div>
          </form>}



        </div>

      </>
    )
  }
}