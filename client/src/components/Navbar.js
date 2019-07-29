import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  // state = {
  //   user: this.props.user
  // }
  // handleLogout = props => {
  //   logout().then(() => {
  //     this.props.setUser(null);
  //   });
  // };
  render() {
    return (
      <div>
        <Link to="/login">Log in</Link>
        <Link to="/signup">Sign up</Link>
        {this.props.user && (
          <Link to={`/user/${this.props.user.username}`}>Profile</Link>
        )}
        {this.props.user && (
          <Link to={`/user/${this.props.user.username}/new-space`}>
            New Space
          </Link>
        )}

        {/* <Link onClick={() => this.handleLogout(this.props)} to="/">
          Logout
            </Link> */}
      </div>
    );
  }
}
