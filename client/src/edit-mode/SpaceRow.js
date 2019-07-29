import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class SpaceRow extends Component {
  render() {
    // const removeSpaceFromUrl = (str) => {
    //   return str.split(" ").join("-")
    // }
    return (
      <div>
        <Link to={`/user/${this.props.username}/${this.props.space.title}`}><h4>{this.props.space.title}</h4></Link>
      </div>
    )
  }
}
