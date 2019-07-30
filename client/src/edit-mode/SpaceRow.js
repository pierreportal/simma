import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class SpaceRow extends Component {
  handledelete = () => {
    axios.get('/user/:userName/:spaceName/delete').then(() => console.log('done')).catch(err => console.log(err))
  }
  render() {

    return (
      <div>
        <Link to={`/user/${this.props.username}/${this.props.space.title}`}><h4>{this.props.space.title}</h4></Link>
        <button onClick={this.handledelete}>delete</button>
      </div>
    )
  }
}
