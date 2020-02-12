import React from 'react'
import axios from 'axios'
import Authorization from '../../../lib/authorization'
import PubForm from './PubForm'

export default class PubEdit extends React.Component {
  state = {
    data: {
      name: '',
      image: '',
      city: '',
      streetName: '',
      postcode: '',
      phone: '',
      website: '',
      description: '',
      maxTeamSize: null,
      quizDay: '',
      quizTime: '',
      averagePintCost: ''
    }
  }
  
  async componentDidMount() {
    const pubId = this.props.match.params.id
    try {
      const res = await axios.get(`/api/pubs/${pubId}`)
      console.log(res.data)
      this.setState({ data: res.data })
    } catch (error) {
      console.log(error)
    }
  }

  handleChange = ({ target: { name, value } }) => {
    const data = { ...this.state.data, [name]: value }
    this.setState({ data })
  }

  handleSubmit = async e => {
    e.preventDefault()
    const pubId = this.props.match.params.id
    try {
      const { data } = await axios.put(`/api/pubs/${pubId}`, this.state.data, {
        headers: { Authorization: `Bearer ${Authorization.getToken()}` }
      })
      this.props.history.push(`/pubs/${data._id}`)
    } catch (error) {
      console.log(error)
    }
  } 

  render() {
    return (
      <PubForm 
        data={this.state.data}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}/>
    )
  }

}