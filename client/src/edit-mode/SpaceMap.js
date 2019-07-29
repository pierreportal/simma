import React, { Component } from 'react'
import axios from 'axios'

export default class SpaceMap extends Component {
  state = {
    username: '',
    title: '',
    nodes: []
  }
  distance = e => {
    this.state.nodes && this.setState({
      nodes: this.state.nodes.map(n => {
        let dist = Math.sqrt(Math.pow((n.position[0] - e.clientX), 2) + Math.pow((n.position[1] - e.clientY), 2))
        let zone = dist < 150
        if (zone) {
          n.start = true;
          n.amp = ((150 - dist) / 150).toFixed(1)
          console.log(n.amp, n.note, n.flavor)
        } else {
          n.start = false;
          n.amp = 0
        }
        return n
      })
    })
  }
  componentDidMount = () => {
    const { userName, spaceName } = this.props.match.params
    this.setState({ username: userName })
    axios.get(`/user/${userName}/${spaceName}`).then(response => {
      this.setState({
        title: response.data[0].title,
        nodes: this.state.nodes.concat(response.data[0].nodes)
      })
    }).catch(err => console.log(err))
  }

  render() {
    const nodes = this.state.nodes.map(n => {
      return <div key={n.id} style={{ position: 'absolute', left: n.position[0], top: n.position[1] }}>{n.amp}</div>
    })
    // console.log(this.state)
    return (
      <div className='map' style={{ width: '100vw', height: '100vh' }} onMouseMove={this.distance} >
        <h4>{this.state.title} by {this.state.username}</h4>
        {nodes}
      </div>
    )
  }
}
