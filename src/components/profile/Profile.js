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
      _id: ''
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
    const { username, favouriteDrinks, quizStrengths, email, bio, personalityType } = this.state.user
    return (
      <>

        {/* <p>test</p> */}
        <p>{username}</p>
        <p>Favourite Drinks: {favouriteDrinks}</p>
        <p>Quiz Strengths: {quizStrengths}</p>
        <p>Email: {email}</p>
        <p>Bio: {bio}</p>
        <p>Peronality Type: {personalityType}</p>
        

        {/* can only edit profile if you are the owner of the profile */}
        
        {this.isOwner() && <Link to={`/profiles/${userId}/edit`}>
          <button type="button" className="button">Edit Profile</button>
        </Link>}
        {Authorization.isAuthenticated() && <Link to={`/profiles/${userId}/message`}>
          <button type="button" className="button">DM Me!</button>
        </Link>}
        


      </>
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