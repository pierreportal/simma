import React, { Component } from "react";
import GenerateScaleBtn from "./GenerateScaleBtn";
import { Greek } from "./editModeConstants";
import Draggable from "react-draggable";
import axios from "axios";
import Tone from "tone";

export default class EditMap extends Component {
  state = {
    space: this.props.nodes ? this.props.nodes : null,
    showInputTitle: false,
    showInstruction: true,
    spaceName: "",
    soundComponents: [],
    displayNoteName: false
  };

  handleDelete = id => {
    this.setState({
      space: this.state.space.filter(x => {
        x.synth.triggerRelease();
        return x.id !== id;
      })
    });
  };

  generateScale = (scale, rootNote, accidental, octave, flavor) => {
    this.state.space &&
      this.state.space.map(n => {
        n.synth.triggerRelease();
        return n;
      });
    const univers = new Greek();
    const generatedScale = univers.scale(
      rootNote,
      accidental,
      octave,
      scale,
      flavor
    );
    // console.log(generatedScale);
    this.state.space
      ? this.setState({
        space: this.state.space.concat(generatedScale).map(n => {
          return { ...n, synth: new Tone.MonoSynth(n.flavor).toMaster() };
          // return n.synth.triggerAttack(n.note)
        })
      })
      : this.setState({
        space: generatedScale
      });
  };

  move = (e, id) => {
    let dragX = e.clientX;
    let dragY = e.clientY;
    this.setState({
      space: this.state.space.map(n => {
        if (n.id === id) {
          n.position[0] = dragX;
          n.position[1] = dragY;
        }
        return n;
      })
    });
  };
  save = () => {
    this.setState({ showInputTitle: true });
  };

  nameSpace = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  saveSpace = () => {
    // console.log(this.state)
    const space = [];
    for (const node in this.state.space) {
      const { synth, ...rest } = this.state.space[node];
      space.push(rest);
    }
    // console.log(space);
    axios
      .post(`/user/${this.props.user.username}/new-space`, {
        ...this.state,
        space
      })
      .then(() => {
        // console.log("done");
        this.setState({ showInputTitle: false });
      })
      .catch(err => console.log(err));
  };

  distance = e => {
    this.state.space &&
      this.setState({
        space: this.state.space.map(n => {
          let dist = Math.sqrt(
            Math.pow(n.position[0] - e.clientX, 2) +
            Math.pow(n.position[1] - e.clientY, 2)
          );
          let zone = dist < 150;
          if (zone) {
            n.start = true;
            n.synth.triggerAttack(n.note);
          } else {
            n.start = false;
            n.synth.triggerRelease();
          }
          return n;
        })
      });
  };

  hideInstruction = () => {
    this.setState({
      showInstruction: false
    });
  };
  displayNoteName = () => {
    this.setState({
      displayNoteName: !this.state.displayNoteName
    });
  };

  render() {
    const nodes =
      this.state.space &&
      this.state.space.map(n => {
        let nodeStyle = {
          width: 10,
          height: 10,
          backgroundColor: "lightcoral",
          borderRadius: "50%",
          position: "absolute",
          left: 0,
          top: 0
        };

        const position = { x: n.position[0], y: n.position[1] };
        return (
          <div key={n.id}>

            <Draggable
              defaultPosition={position}
              onDrag={e => this.move(e, n.id)}
            >
              <div style={nodeStyle}>
                <button
                  style={{ border: "none", background: "none", margin: "6px" }}
                  onClick={() => this.handleDelete(n.id)}
                >
                  x
                </button>
                {this.state.displayNoteName && <p>{String(n.note)}</p>}
              </div>
            </Draggable>
          </div>
        );
      });

    return (
      <div
        className="editmap"
        style={{ width: "100vw", height: "100vh" }}
        onMouseDown={this.hideInstruction}
        onMouseMove={this.distance}
      >
        {this.state.showInstruction && (
          <h3 style={{ marginTop: "160px" }}>create your scale here</h3>
        )}
        <GenerateScaleBtn generateScale={this.generateScale} />
        {this.state.space && (
          <button className="cbutton4 saving" onClick={this.save}>
            Save
          </button>
        )}
        {this.state.displayNoteName && this.state.space.length ? (
          <button className="cbutton6" onClick={this.displayNoteName}>
            Hide note
          </button>
        ) : (
            <button className="cbutton6" onClick={this.displayNoteName}>
              Display note
          </button>
          )}
        {this.state.showInputTitle && (
          <>
            <input
              className="inputf"
              name="spaceName"
              onChange={this.nameSpace}
              type="text"
              placeholder="Name your space"
            />{" "}
            <button className="cbutton5" onClick={this.saveSpace}>
              Done
            </button>
          </>
        )}
        {nodes}
        {/* <Colorback /> */}
        {this.state.soundComponents && this.state.soundComponents}
      </div>
    );
  }
}
