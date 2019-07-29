import React, { Component } from 'react'
import axios from 'axios'

export default class Login extends Component {
  state = {
    username: '',
    password: ''
  }
  handleChange = e => {
    console.log(e.target.value)
    const name = e.target.name
    const value = e.target.value
    this.setState({
      [name]: value
    })
  }
  handleSubmit = e => {
    e.preventDefault()
    console.log('submit')
    axios.post('/auth/signup', { username: this.state.username, password: this.state.password }).then(data => {
      console.log(data)
    }).catch(err => console.log(err))
  }
  render() {
    return (
      <div>
        <h1>Sign up</h1>
        <form method="post" onSubmit={this.handleSubmit}>

          <label htmlFor="username" name='username'>Username:</label>
          <input onChange={this.handleChange} type="text" name='username' id="username" value={this.state.username} />

          <label htmlFor="password" name='password'>Password:</label>
          <input onChange={this.handleChange} type="password" name='password' id="password" value={this.state.password} />

          <button type='submit'>Sign up</button>
        </form>
      </div>
    )
  }
}
