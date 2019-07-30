import React, { Component } from 'react'

export default class Vanilla extends Component {
  render() {
    console.log('THIS IS FROM VANILLA')
    return (
      <div>
        <p>Vanilla, {this.props.freq} {this.props.amp}</p>
      </div>
    )
  }
}
