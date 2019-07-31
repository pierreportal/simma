import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Login extends Component {
  state = {
    username: "",
    password: ""
  };
  handleChange = e => {
    console.log(e.target.value);
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    console.log("submit");
    axios
      .post("/auth/signup", {
        username: this.state.username,
        password: this.state.password
      })
      .then(data => {
        console.log(data);
      })
      .catch(err => console.log(err));
  };
  render() {
    return (
      <div className="signup">
        {/* <h1>Sign up</h1> */}
        <form className="auth-form" method="post" onSubmit={this.handleSubmit}>
          <label htmlFor="username" name="username">
            {/* Username: */}
          </label>
          <input
            className="authInput"
            onChange={this.handleChange}
            type="text"
            name="username"
            id="username"
            placeholder="choose username"
            value={this.state.username}
          />

          <label htmlFor="password" name="password">
            {/* Password: */}
          </label>
          <input
            className="authInput"
            onChange={this.handleChange}
            type="password"
            name="password"
            id="password"
            placeholder="choose password"
            value={this.state.password}
          />

          <button className="authButton" type="submit">
            Sign up
          </button>
          <p className="logp">
            Already have an account ? <Link to={"/login"}>Log in</Link>
          </p>
        </form>
      </div>
    );
  }
}
