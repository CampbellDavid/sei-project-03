import React from 'react'
import axios from 'axios'
import Authorization from '../../../lib/authorization'
import ProfileForm from './ProfileForm'

class ProfileEdit extends React.Component {

  state = {
    user: {
      username: '',
      favouriteDrinks: [],
      quizStrengths: [],
      email: '',
      bio: '',
      personalityType: '',
      _id: ''
    },
    errors: {}
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
  handleChange = e => {
    const user = { ...this.state.user, [e.target.name]: e.target.value }
    const errors = { ...this.state.errors, [e.target.name]: '' }
    this.setState({ user, errors })
  }

  handleSubmit = async e => {
    e.preventDefault()
    const userId = this.props.match.params.id
    try {
      const { user } = await axios.put(`/api/profiles/${userId}`, this.state.user, {
        headers: { Authorization: `Bearer ${Authorization.getToken()}` }
      })
      this.props.history.push(`/profiles/${user._id}`)
    } catch (error) {
      this.setState({ errors: error.response.data.errors })
    }
  }

  render() {
    console.log('rendering')
    const { user } = this.state
    return (
      <>
        {Authorization.isAuthenticated() && <p>{user.username}</p>}
        {Authorization.isAuthenticated() && <ProfileForm
          user={this.state.user}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          errors={this.state.errors}
        />}
      </>
    )
  }
}

export default ProfileEdit


//TODO
//* after login, redirect to user profile page, show the following information

//* embed team card (if currentUser belongs to certain teams)

//* team card should contain links to user profiles (non-secure route)
//* public user profiles have a direct message button => DirectMessage component