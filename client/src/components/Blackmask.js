import React, { Component } from "react";

export default class Blackmask extends Component {
  componentDidMount() {
    window.addEventListener("mousemove", function(e) {
      document.getElementById("chartdiv").style.left = e.x - 150 + "px";
      document.getElementById("chartdiv").style.top = e.y - 150 + "px";
      document.getElementById("chartdiv").style.width = 300 + "px";
      document.getElementById("chartdiv").style.height = 300 + "px";
    });
  }
  render() {
    return (
      <div>
        <div id="chartdiv" class="hole" />
      </div>
    );
  }
}
