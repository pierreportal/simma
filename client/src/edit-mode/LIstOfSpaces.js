import React, { Component } from 'react'
import axios from 'axios'

export default class LIstOfSpaces extends Component {
  state = {
    list: []
  }
  componentDidMount = () => {
    console.log('component mounted')
    axios.get('/user/getall').then(response => {
      console.log(response)
      this.setState({
        list: response.data
      }).catch(err => console.log(err));
    });
  };
  render() {
    const list = this.state.list.map(x => {
      return <li>{x}</li>
    })
    return (
      <div>
        <h4>Spaces</h4>
        <ul>
          {list}
        </ul>
      </div>
    )
  }
}
