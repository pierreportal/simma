import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ListOfSpaces from './LIstOfSpaces'


export default class SpaceMap extends Component {
  state = {
    currentUser: '',
    username: '',
    title: '',
    nodes: [],
    ownerName: '',
    spaceId: '',
    mouseDown: false
  }

  mouseDown = () => {
    this.setState({
      mouseDown: true
    })
  }
  mouseUp = () => {
    this.setState({
      mouseDown: false,
      nodes: this.state.nodes.map(n => { n.amp = 0; n.start = false; return n })
    })
  }

  distance = e => {
    if (this.state.mouseDown) {
      this.state.nodes && this.setState({
        nodes: this.state.nodes.map(n => {
          let dist = Math.sqrt(Math.pow((n.position[0] - e.clientX), 2) + Math.pow((n.position[1] - e.clientY), 2))
          let zone = dist < 150
          if (zone) {
            n.start = true;
            n.amp = ((150 - dist) / 150).toFixed(1)
            // this.props.robertsSound(note, amp, flavor)
          } else {
            n.start = false;
            n.amp = 0
          }
          return n
        })
      })
    }
  }

  handleBookmark = () => {
    console.log(this.state.spaceId)
    console.log(this.props.user)
    axios.post(`/user/${this.state.username}/like-space`, { spaceId: this.state.spaceId, user: this.props.user }).then(() => {
      console.log(`${this.state.title} has been saved iy your bookmarks :)`)
    }).catch(err => console.log(err))
  }
  handleUnlike = () => {
    axios.post(`/user/${this.state.username}/unlike-space`, { spaceId: this.state.spaceId, user: this.props.user }).then(() => {
      console.log(`${this.state.title} has been saved iy your bookmarks :)`)
    }).catch(err => console.log(err))
  }







  handleEditSpace = () => {
    console.log('Go in edit mode')
    // go to EditMap with this space in props
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.match.params.userName !== this.props.match.params.userName || prevProps.match.params.spaceName !== this.props.match.params.spaceName) {
      this.load()
    }
  }

  load = () => {
    console.log("mount")
    const { userName, spaceName } = this.props.match.params
    this.setState({ username: userName })

    axios.get(`/user/${userName}/${spaceName}`).then(response => {
      console.log(response)
      this.setState({
        title: response.data[0].title,
        nodes: response.data[0].nodes,
        ownerName: response.data[0].ownerName,
        spaceId: response.data[0]._id
      })
    }).catch(err => console.log(err))
  }

  componentDidMount = () => {
    this.load()
  }



  render() {
    const nodes = this.state.nodes.map(n => {
      return <div key={n.id} style={{ position: 'absolute', left: n.position[0], top: n.position[1] }}>{(n.amp)}</div>
    })

    // const likeBtn = () => {
    //   if (this.state.ownerName !== this.props.user.username) {
    //     if (!this.props.user.favoriteSpaces.includes(this.state.spaceId)) {
    //       return <button onClick={this.handleBookmark}>Like</button>
    //     } else {
    //       return <button onClick={this.handleBookmark}>Unlike</button>
    //     }
    //   }
    // }
    console.log(this.props.user)
    return (
      <div className='map' style={{ width: '100vw', height: '100vh' }} onMouseDown={this.mouseDown} onMouseUp={this.mouseUp} onMouseMove={this.distance} >
        <ListOfSpaces />
        <h4>{this.state.title} by {this.state.username}</h4>


        {this.state.ownerName !== this.props.user.username ?
          !this.props.user.favoriteSpaces.includes(this.state.spaceId) ?
            <button onClick={this.handleBookmark}>Like</button>
            :
            <button onClick={this.handleUnlike}>Unlike</button>
          : null
        }



        {this.state.ownerName === this.props.user.username && <Link to={`/user/${this.state.username}/edit-space/${this.state.spaceId}`}><button onClick={this.handleEditSpace}>Edit</button></Link>}
        {nodes}
      </div >
    )
  }
}
