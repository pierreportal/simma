import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class LikedSpaces extends Component {
  state = {
    list: []
  }
  componentDidMount = () => {
    axios.get('/api/user/likedSpaces', { user: this.props.user }).then(response => {
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
      <div id="favoritelist">
        <h4>Liked spaces</h4>
        <ul>
          {list}
        </ul>
      </div>
    )
  }
}
