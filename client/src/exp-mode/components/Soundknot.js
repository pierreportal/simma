import React, { Component } from "react";

export default class Soundknot extends Component {
  transformPoint({ x, y }) {
    return {
      x: 0.5 + this.props.scale * (x - this.props.x),
      y: 0.5 + this.props.scale * (y - this.props.y)
    };
  }
  render() {
    const p1 = this.transformPoint({ x: this.props.x, y: this.props.y });
    const { scale } = this.props;

    return (
      <div
        style={{
          position: "absolute",
          width: 50 * this.props.scale,
          height: 50 * this.props.scale,
          backgroundColor: "white",
          borderRadius: 50 + "%",
          transform: `translate(${p1.x * 100}vw, ${p1.y *
            100}vh) translate(${-25 * scale}px, ${-25 * scale}px)`
        }}
      />
    );
  }
}
