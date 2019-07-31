import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class Navbar extends Component {
  state = {
    user: this.props.user
  }
  handleLogout = props => {
    axios.post("/auth/logout").then(() => {
      props.setUser(null);
    });
  };
  render() {
    return (
      <div className="navbar">
        <div className='logo'><h1>Simma</h1></div>
        <div className="head-menu">
          <ul>
            {!this.props.user && <li> <Link to='/login'>Log in</Link></li>}
            {!this.props.user && <li> <Link to='/signup'>Sign up</Link></li>}
            {this.props.user && <li><Link to={`/user/${this.props.user.username}`}>Profile</Link></li>}
            {this.props.user && <li><Link to={`/user/${this.props.user.username}/new-space`}>New Space</Link></li>}
            {this.props.user && <li><Link onClick={() => this.handleLogout(this.props)} to="/login">Logout</Link></li>}
          </ul>
          {/* <Link onClick={() => this.handleLogout(this.props)} to="/">Logout</Link> */}
        </div>
      </div>
    )
  }
}
