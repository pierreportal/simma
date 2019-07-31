import React, { Component } from "react";

export default class Colorback extends Component {
  componentDidMount() {
    var tempX = 0;
    var tempY = 0;

    var body = document.getElementsByClassName("App");

    function getMouseXY(e) {
      tempX = e.pageX;
      tempY = e.pageY;

      if (tempX < 0) {
        tempX = 0;
      }
      if (tempY < 0) {
        tempY = 0;
      }

      // figure out how to make xy with in rgb range
      tempX = Math.floor(scale(tempX, 0, window.innerWidth, 0, 255));
      tempY = Math.floor(scale(tempY, 0, window.innerHeight, 0, 255));

      body[0].style.backgroundImage = ` linear-gradient(
        to right,
        rgba(${tempX}, 0, ${tempY}),
        rgba(${tempY}, 0, 0)
      )`;
      console.log("X coordinate: " + tempX);
      console.log("Y coordinate: " + tempY);

      return true;
    }

    // Map one range of numbers to another range or numbers
    function scale(num, in_min, in_max, out_min, out_max) {
      return (
        ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
      );
    }

    document.addEventListener("mousemove", getMouseXY);
  }

  render() {
    return <div />;
  }
}
