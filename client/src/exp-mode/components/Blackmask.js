import React, { Component } from "react";
import $ from "jquery";
import Arrows from "./Arrows";

export default class Blackmask extends Component {
  componentDidMount() {
    $(document).on("mousedown", function(e) {
      $(".hole")
        .removeClass("hole")
        .addClass("largehole");
    });
    $(document).on("mouseup", function() {
      $(".largehole")
        .removeClass("largehole")
        .addClass("hole");
    });

    const changeDiameter = e => {
      let hole = document.getElementsByClassName("hole");
      let largehole = document.getElementsByClassName("largehole");

      if (largehole.length > 0) {
        document.getElementById("chartdiv").style.left = e.pageX - 250 + "px";
        document.getElementById("chartdiv").style.top = e.pageY - 250 + "px";
      } else if (hole.length > 0) {
        document.getElementById("chartdiv").style.left = e.pageX - 50 + "px";
        document.getElementById("chartdiv").style.top = e.pageY - 50 + "px";
      }
    };

    window.addEventListener("mousemove", changeDiameter);
    window.addEventListener("mouseup", changeDiameter);
    window.addEventListener("mousedown", changeDiameter);
  }
  render() {
    return (
      <div>
        <div id="chartdiv" class="hole" />
        <Arrows />
      </div>
    );
  }
}
