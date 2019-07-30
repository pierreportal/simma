import React, { Component } from "react";
import axios from "axios";
// import Background from "./../exp-mode/components/Background";
import Blackmask from "./../exp-mode/components/Blackmask";
import Colorback from "../exp-mode/components/Colorback";

export default class SpaceMap extends Component {
  state = {
    username: "",
    title: "",
    nodes: []
    // voyagerPosition: [window.innerWidth / 2 - 5, window.innerHeight / 2 - 5]
  };

  distance = e => {
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
            n.amp = ((150 - dist) / 150).toFixed(1);
          } else {
            n.start = false;
            n.amp = 0;
          }
          return n;
        })
      });
  };
  componentDidMount = () => {
    const { userName, spaceName } = this.props.match.params;
    this.setState({ username: userName });

    axios
      .get(`/user/${userName}/${spaceName}`)
      .then(response => {
        console.log(response.data);
        this.setState({
          // otherSpaces: response.data,
          title: response.data[0].title,
          nodes: this.state.nodes.concat(response.data[0].nodes)
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    // let voyagerStyle = {
    //   width: 10,
    //   height: 10,
    //   backgroundColor: 'lightcoral',
    //   borderRadius: '50%',
    //   position: 'absolute',
    //   left: this.state.voyagerPosition[0],
    //   top: this.state.voyagerPosition[1],
    // }
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
        onMouseMove={this.distance}
      >
        <h4>
          {this.state.title} by {this.state.username}
        </h4>
        {nodes}
        {/* <div style={voyagerStyle}></div> */}
        <Colorback />
        {/* <Blackmask /> */}
      </div>
    );
  }
}
