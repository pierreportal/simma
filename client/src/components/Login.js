import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Colorback from "../exp-mode/components/Colorback";

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
      .post("/auth/login", {
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        this.props.setUser(response.data);
        this.props.history.push(`/user/${response.data.username}`);
      })
      .catch(err => console.log(err));
  };
  render() {
    return (
      <div className="login">
        {/* <h1>login</h1> */}
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
            placeholder="username"
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
            placeholder="password"
            value={this.state.password}
          />

          <button class="authButton" type="submit">
            Log in
          </button>
          <p className="logp">
            Don't have an account ? <Link to={"/signup"}>Create one</Link>
          </p>
        </form>
        <Colorback />
      </div>
    );
  }
}
