import React from 'react'
import axios from 'axios'

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
        <h1>{username}</h1>
        <p>Favourite Drinks: {favouriteDrinks}</p>
        <p>Quiz Strengths: {quizStrenghts}</p>
        <p>Email: {email}</p>
        <p>Bio: {bio}</p>
        <p>Peronality Type: {personalityType}</p>
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

