import React, { Component } from 'react'
import axios from 'axios'
// import LIstOfSpaces from './LIstOfSpaces';





export default class SpaceMap extends Component {
  state = {
    currentUser: '',
    username: '',
    title: '',
    nodes: [],
    ownerName: '',
    spaceId: ''
  }

  distance = e => {
    this.state.nodes && this.setState({
      nodes: this.state.nodes.map(n => {
        let dist = Math.sqrt(Math.pow((n.position[0] - e.clientX), 2) + Math.pow((n.position[1] - e.clientY), 2))
        let zone = dist < 150
        if (zone) {
          n.start = true;
          n.amp = ((150 - dist) / 150).toFixed(1)
        } else {
          n.start = false;
          n.amp = 0
        }
        return n
      })
    })
  }

  handleBookmark = () => {
    console.log(this.state.spaceId)
    axios.post(`/user/${this.state.username}/like-space`, this.state.spaceId, this.props.user).then(() => {
      console.log(`${this.state.title} has been saved iy your bookmarks :)`)
    }).catch(err => console.log(err))
  }


  componentDidMount = () => {
    const { userName, spaceName } = this.props.match.params
    this.setState({ username: userName })

    axios.get(`/user/${userName}/${spaceName}`).then(response => {
      // console.log(response.data)
      this.setState({
        title: response.data[0].title,
        nodes: this.state.nodes.concat(response.data[0].nodes),
        ownerName: response.data[0].ownerName,
        spaceId: response.data[0]._id
      })
    }).catch(err => console.log(err))
  }

  render() {
    // console.log(this.state)
    const nodes = this.state.nodes.map(n => {
      return <div key={n.id} style={{ position: 'absolute', left: n.position[0], top: n.position[1] }}>{n.amp}</div>
    })

    return (
      <div className='map' style={{ width: '100vw', height: '100vh' }} onMouseMove={this.distance} >
        <h4>{this.state.title} by {this.state.username}</h4>
        {/* <LIstOfSpaces /> */}

        {this.state.ownerName !== this.state.username && <button onClick={this.handleBookmark}>Like</button>}

        {nodes}
        {/* <div style={voyagerStyle}></div> */}
      </div>
    )
  }
}

