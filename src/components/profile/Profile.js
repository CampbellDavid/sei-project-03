import React from 'react'
import axios from 'axios'
import Auth from '../../../lib/authorization'

class Profile extends React.Component {

  state = {
    user: {
      username: '',
      favouriteDrinks: [],
      quizStrenghts: [],
      email: '',
      bio: '',
      personalityType: '',
      _id: ''
    }
  }

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
    console.log('rendering')
    const { username, favouriteDrinks, quizStrenghts, email, bio, personalityType } = this.state.user
    return (
      <>
        {!Auth.isAuthenticated() && <h1>{username}</h1>}
        {!Auth.isAuthenticated() && <p>Favourite Drinks: {favouriteDrinks}</p>}
        {!Auth.isAuthenticated() && <p>Quiz Strengths: {quizStrenghts}</p>}
        {!Auth.isAuthenticated() && <p>Email: {email}</p>}
        {!Auth.isAuthenticated() && <p>Bio: {bio}</p>}
        {!Auth.isAuthenticated() && <p>Peronality Type: {personalityType}</p>}

        {Auth.isAuthenticated() && <h1>{username}</h1>}
        {Auth.isAuthenticated() && <p>Favourite Drinks: {favouriteDrinks}</p>}
        {Auth.isAuthenticated() && <p>Quiz Strengths: {quizStrenghts}</p>}
        {Auth.isAuthenticated() && <p>Email: {email}</p>}
        {Auth.isAuthenticated() && <p>Bio: {bio}</p>}
        {Auth.isAuthenticated() && <p>Peronality Type: {personalityType}</p>}
      </>
    )
  }
}
  
export default Profile


//TODO
//* after login, redirect to user profile page, show the following information

//* embed team card (if currentUser belongs to certain teams)

//* team card should contain links to user profiles (non-secure route)
//* public user profiles have a direct message button => DirectMessage component







//username: { type: String, required: true, unique: true },
// email: { type: String, required: true, unique: true },
// password: { type: String, required: true },
// favouriteDrinks: [{ type: String }],
// personalityType: { type: String },
// bio: { type: String },
// age: { type: Number },
// gender: { type: String },
// quizStrengths: [{ type: String }],
// profileImage: { type: String }

