import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class LIstOfSpaces extends Component {
  state = {
    list: []
  }
  componentDidMount = () => {
    console.log('component mounted list of spaces')
    axios.get('/api/user/getall').then(response => {
      console.log(response.data)
      this.setState({
        list: response.data
      })
    }).catch(err => console.log(err));
  };
  render() {
    const list = this.state.list.map(x => {
      return <li key={x._id}><Link to={`/user/${x.ownerName}/${x.title}`}>{x.title} by {x.ownerName}</Link></li>
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
