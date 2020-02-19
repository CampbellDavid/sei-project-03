import React from 'react'
import axios from 'axios'
import Authorization from '../../../lib/authorization'
import { Link } from 'react-router-dom'

class Profile extends React.Component {

  state = {
    user: {
      username: '',
      favouriteDrinks: [],
      quizStrengths: [],
      email: '',
      bio: '',
      personalityType: '',
      _id: '',
      profileImage: ''
    }
  }

  isOwner = () => Authorization.getPayload().sub === this.state.user._id


  async componentDidMount() {
    const userId = this.props.match.params.id
    try {
      const res = await axios.get(`/api/profiles/${userId}`)
      this.setState({ user: res.data })
    } catch (error) {
      console.log(error)
    }
  }


  render() {
    const userId = this.props.match.params.id
    const { username, favouriteDrinks, quizStrengths, email, bio, personalityType, profileImage } = this.state.user
    return (
      <div className="profile-container">
        <div className="profile-card">
          <h2>{username}</h2>
          <br />
          <div className="profile-bio">

            <img className="profile-image" src={profileImage} />
            <p> {bio}</p>
            <div className="third-column">
              <p><span> Favourite Drinks:</span> {favouriteDrinks}</p>
              <p><span>Quiz Strengths: </span>{quizStrengths}</p>
              <p><span>Peronality Type:</span> {personalityType}</p>
              <p><span>{email}</span></p>
            </div>
            {this.isOwner() && <Link to={`/profiles/${userId}/edit`}>
              <button type="button" className="button">Edit Profile</button>
            </Link>}
          </div>

        </div>
      </div>
    )
  }
}

export default Profile