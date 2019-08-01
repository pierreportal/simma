import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ListOfSpaces from "./LIstOfSpaces";
import Blackmask from "./../exp-mode/components/Blackmask";
import Colorback from "../exp-mode/components/Colorback";
import Tone from "tone";

export default class SpaceMap extends Component {
  state = {
    currentUser: "",
    username: "",
    title: "",
    nodes: [],
    ownerName: "",
    spaceId: "",
    mouseDown: false
  };
  // ############################################### mouse down / up --> ALL GOOD
  mouseDown = () => {
    this.setState({
      mouseDown: true
    });
  };
  mouseUp = () => {
    this.setState({
      mouseDown: false,
      nodes: this.state.nodes.map(n => {
        n.amp = 0;
        n.start = false;
        n.synth.triggerRelease();
        // this.props.stopSound(n.note)
        return n;
      })
    });
  };

  distance = e => {
    console.log("mo");
    this.state.mouseDown &&
      this.state.nodes &&
      this.setState({
        nodes: this.state.nodes.map(n => {
          let dist = Math.sqrt(
            Math.pow(n.position[0] - e.clientX, 2) +
              Math.pow(n.position[1] - e.clientY, 2)
          );
          let zone = dist < 150;
          if (zone) {
            n.start = true;
            n.synth.triggerAttack(n.note);
            console.log(n);
          } else {
            n.start = false;
            n.synth.triggerRelease();
          }
          return n;
        })
      });
  };

  // ############################################### like Space --> ALL GOOD
  handleBookmark = () => {
    axios
      .post(`/user/${this.state.username}/like-space`, {
        spaceId: this.state.spaceId,
        user: this.props.user
      })
      .then(() => {
        console.log(`${this.state.title} has been saved iy your bookmarks :)`);
      })
      .catch(err => console.log(err));
  };
  handleUnlike = () => {
    axios
      .post(`/user/${this.state.username}/unlike-space`, {
        spaceId: this.state.spaceId,
        user: this.props.user
      })
      .then(() => {
        console.log(`${this.state.title} has been saved iy your bookmarks :)`);
      })
      .catch(err => console.log(err));
  };

  // ############################################### Edit Space --> TO DO
  handleEditSpace = () => {
    console.log("Go in edit mode");
  };
  componentDidMount = () => {
    this.load();
  };

  componentDidUpdate = prevProps => {
    if (
      prevProps.match.params.userName !== this.props.match.params.userName ||
      prevProps.match.params.spaceName !== this.props.match.params.spaceName
    ) {
      this.load();
    }
  };

  load = () => {
    console.log("LOADING");
    const { userName, spaceName } = this.props.match.params;
    this.setState({ username: userName });
    axios
      .get(`/user/${userName}/${spaceName}`)
      .then(response => {
        console.log(response.data);
        this.setState(
          {
            title: response.data[0].title,
            nodes: response.data[0].nodes.map(n => {
              return { ...n, synth: new Tone.MonoSynth(n.flavor).toMaster() };
              // return n.synth.triggerAttack(n.note)
            }),
            ownerName: response.data[0].ownerName,
            spaceId: response.data[0]._id
          },
          () => console.log(this.state)
        );
      })
      .catch(err => console.log(err));
  };

  render() {
    // this.props.activateKeys(this.state.nodes);
    const nodes = this.state.nodes.map(n => {
      return (
        <div
          key={n.id}
          style={{
            position: "absolute",
            left: n.position[0],
            top: n.position[1]
          }}
        >
          {n.amp}
        </div>
      );
    });

    return (
      <div
        className="map"
        style={{ width: "100vw", height: "100vh" }}
        onMouseDown={this.mouseDown}
        onMouseUp={this.mouseUp}
        onMouseMove={this.distance}
      >
        <ListOfSpaces />
        <h4>
          {this.state.title} by {this.state.username}
        </h4>
        ​
        {this.state.ownerName !== this.props.user.username ? (
          !this.props.user.favoriteSpaces.includes(this.state.spaceId) ? (
            <button onClick={this.handleBookmark}>Like</button>
          ) : (
            <button onClick={this.handleUnlike}>Unlike</button>
          )
        ) : null}
        ​
        {this.state.ownerName === this.props.user.username && (
          <Link
            to={`/user/${this.state.username}/edit-space/${this.state.spaceId}`}
          >
            <button onClick={this.handleEditSpace}>Edit</button>
          </Link>
        )}
        {nodes}
        <Colorback />
        <Blackmask />
      </div>
    );
  }
}
