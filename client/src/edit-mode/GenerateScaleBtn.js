import React, { Component } from "react";
import {
  modes,
  notes,
  accidentals,
  octaves,
  flavors
} from "./editModeConstants";

export default class GenerateScaleBtn extends Component {
  state = {
    showScalePrompt: false,
    inputScale: modes[0],
    inputNote: notes[0],
    inputAccidentals: accidentals[0],
    inputOctaves: octaves[2],
    inputFlavor: flavors[0],
    listOfOctaves: octaves,
    listOfModes: modes,
    listOfNotes: notes,
    listOfAccidentals: accidentals,
    listOfFlavors: flavors
  };
  // METHODS
  generateScale = () => {
    this.setState({ showScalePrompt: !this.state.showScalePrompt });
  };

  componentDidMount() {
    var tempX = 0;
    var tempY = 0;

    var body = document.getElementsByClassName("select-css");

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
      for (let i = 0; i < body.length; i++) {
        body[i].style.backgroundImage = ` linear-gradient(
          to right,
          rgba(${tempX}, 0, ${tempY}),
          rgba(${tempY}, 0, 255)
        )`;
      }
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

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  handleSubmit = e => {
    e.preventDefault();
    const {
      inputScale,
      inputNote,
      inputAccidentals,
      inputOctaves,
      inputFlavor
    } = this.state;
    this.setState({ showScalePrompt: false });
    this.props.generateScale(
      inputScale,
      inputNote,
      inputAccidentals,
      inputOctaves,
      inputFlavor
    );
  };
  // RENDER
  render() {
    return (
      <div className="center">
        {
          <button className="cbutton3" onClick={this.generateScale}>
            {this.state.showScalePrompt ? "cancel" : "new space"}
          </button>
        }

        {this.state.showScalePrompt && (
          <form className="newForm" onSubmit={this.handleSubmit}>
            <select
              className="select-css"
              onChange={this.handleChange}
              name="inputNote"
              value={this.state.inputNote}
            >
              {this.state.listOfNotes.map((x, i) => (
                <option key={i} value={x}>
                  {x}
                </option>
              ))}
            </select>
            <select
              className="select-css"
              onChange={this.handleChange}
              name="inputAccidentals"
              value={this.state.inputAccidentals}
            >
              {this.state.listOfAccidentals.map((x, i) => (
                <option key={i} value={x}>
                  {x}
                </option>
              ))}
            </select>
            <select
              className="select-css"
              onChange={this.handleChange}
              name="inputOctaves"
              value={this.state.inputOctaves}
            >
              {this.state.listOfOctaves.map((x, i) => (
                <option key={i} value={x}>
                  {x}
                </option>
              ))}
            </select>
            <select
              className="select-css"
              onChange={this.handleChange}
              name="inputScale"
              value={this.state.inputScale}
            >
              {this.state.listOfModes.map((x, i) => (
                <option key={i} value={x}>
                  {x}
                </option>
              ))}
            </select>

            <select
              className="select-css"
              onChange={this.handleChange}
              name="inputFlavor"
              value={this.state.inputFlavor}
            >
              {this.state.listOfFlavors.map((x, i) => (
                <option key={i} value={x}>
                  {x}
                </option>
              ))}
            </select>

            <button className="cbutton2" type="submit">
              Create
            </button>
          </form>
        )}
      </div>
    );
  }
}
