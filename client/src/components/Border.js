import React, { Component } from "react";

export default class Border extends Component {
  render() {
    return (
      <div>
        <div onClick={this.props.handleChangeW} id="lborder" />
        <div onClick={this.props.handleChangeW} id="rborder" />
        <div onClick={this.props.handleChangeW} id="tborder" />
        <div onClick={this.props.handleChangeW} id="bborder" />
      </div>
    );
  }
}
