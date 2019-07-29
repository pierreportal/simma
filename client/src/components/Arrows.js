import React, { Component } from "react";

export default class Arrows extends Component {
  componentDidMount() {
    console.log(this.props.soundKnots);
    setTimeout(function() {
      var arrows = document.querySelectorAll(".arrow");

      document
        .querySelector("body")
        .addEventListener("mousemove", function(event) {
          arrows.forEach(arrow => {
            var arrowRects = arrow.getBoundingClientRect();
            var arrowX = arrowRects.left + arrowRects.width / 2;
            var arrowY = arrowRects.top + arrowRects.height / 2;
            arrow.style.transform =
              "rotate(" +
              Math.atan2(event.clientY - arrowY, event.clientX - arrowX) +
              "rad)";
          });
        });
    }, 1);
  }

  render() {
    return (
      <div id="box">
        <div class="arrow arrow1">-----></div>
        <div class="arrow arrow2">-----></div>
        <div class="arrow arrow3">-----></div>
        <div class="arrow arrow4">-----></div>
      </div>
    );
  }
}
