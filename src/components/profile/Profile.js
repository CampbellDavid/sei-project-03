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
      console.log(res.data)
      this.setState({ user: res.data })
    } catch (error) {
      console.log(error)
    }
  }


  render() {
    const userId = this.props.match.params.id
    console.log('rendering')
    const { username, favouriteDrinks, quizStrengths, email, bio, personalityType, profileImage } = this.state.user
    return (
      <div className="profile-container">
        <div className="profile-card">
          {/* <p>test</p> */}
          <h2>{username}</h2>
          <br/>
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
            {Authorization.isAuthenticated() && <Link to={`/profiles/${userId}/message`}>
              <button type="button" className="button">DM Me!</button>
            </Link>}
          </div>

          {/* can only edit profile if you are the owner of the profile */}
        
        
        </div>


      </div>
    )
  }
}

export default Profile



//TODO

// Add profile image
//* after login, redirect to user profile page, show the following information

//* embed team card (if currentUser belongs to certain teams)

//* team card should contain links to user profiles (non-secure route)
//* public user profiles have a direct message button => DirectMessage component