import React, { Component } from "react";
import panAndZoomHoc from "react-pan-and-zoom-hoc";
import Arrows from "./Arrows";
import List from "./List";
import Blackmask from "./Blackmask";

const InteractiveDiv = panAndZoomHoc("div");

export default class Background extends Component {
  state = {
    scale: 1,
    x: 0.5,
    y: 0.5,
    knotArray: [
      { x: 0.2, y: 0.2, scale: 1 },
      { x: 0.4, y: 0.3, scale: 1 },
      { x: 0.6, y: 0.8, scale: 1 }
    ]
  };

  addNode = () => {
    let newArray = [
      ...this.state.knotArray,
      {
        x: Math.random() * 3,
        y: Math.random() * 3,
        scale: 1
      }
    ];
    this.setState({
      knotArray: newArray
    });
  };

  handlePanAndZoom = (x, y, scale) => {
    this.setState({ x, y, scale });
  };

  handlePanMove = (x, y) => {
    this.setState({ x, y });
    console.log(x, y);
  };

  handleZoomEnd = () => console.log("Zoom has ended.");

  transformPoint({ x, y }) {
    return {
      x: 0.5 + this.state.scale * (x - this.state.x),
      y: 0.5 + this.state.scale * (y - this.state.y)
    };
  }

  render() {
    const mapped = this.state.knotArray.map(el => {
      const p1 = this.transformPoint({ x: el.x, y: el.y });

      return (
        <div
          style={{
            position: "absolute",
            width: 50 * this.state.scale,
            height: 50 * this.state.scale,
            backgroundColor: "white",
            borderRadius: 50 + "%",
            transform: `translate(${p1.x * 100}vw, ${p1.y *
              100}vh) translate(${-25 * this.state.scale}px, ${-25 *
              this.state.scale}px)`
          }}
        />
      );
    });

    const { x, y, scale } = this.state;

    return (
      <InteractiveDiv
        x={x}
        y={y}
        scale={scale}
        scaleFactor={Math.sqrt(2)}
        minScale={0.3}
        maxScale={3}
        onPanAndZoom={(x, y, scale) => this.handlePanAndZoom(x, y, scale)}
        ignorePanOutside
        style={{
          width: 98 + "vw",
          height: 98 + "vh",
          boxSizing: "border-box",
          position: "relative"
        }}
        onPanMove={(x, y) => this.handlePanMove(x, y)}
        onZoomEnd={this.handleZoomEnd}
      >
        <div className="buttonbox">
          <button className="addbutton" onClick={this.addNode.bind(this)}>
            add random node
          </button>
        </div>
        {mapped}

        <Blackmask />
        <Arrows soundKnots={this.state.x} />
        <List />
      </InteractiveDiv>
    );
  }
}
