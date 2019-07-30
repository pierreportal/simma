import React, { Component } from "react";
import $ from "jquery";

export default class Blackmask extends Component {
  componentDidMount() {
    $(document).on("mousedown", function() {
      $(".hole")
        .removeClass("hole", 1000)
        .addClass("largehole", 1000);
    });
    $(document).on("mouseup", function() {
      $(".largehole")
        .removeClass("largehole")
        .addClass("hole");
    });

    //   $("body").click(function() {
    //     $(".hole").addClass("largehole", 500);
    //   });

    window.addEventListener("mousemove", function(e) {
      document.getElementById("chartdiv").style.left = e.x - 50 + "px";
      document.getElementById("chartdiv").style.top = e.y - 50 + "px";
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
