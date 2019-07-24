import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Navbar extends Component {
  state = {

  }
  render() {
    return (
      <div>
        <Link to='/login'>Log in</Link>
        <Link to='/signup'>Sign up</Link>
      </div>
    )
  }
}
