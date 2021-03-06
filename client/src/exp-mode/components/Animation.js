import React from "react";
import Lottie from "react-lottie";
import animationData from "./icon3.json";

export default class Animation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isStopped: false, isPaused: false };
  }

  render() {
    // const buttonStyle = {
    //   display: "block",
    //   margin: "10px auto"
    // };

    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    };

    return (
      <div>
        <Lottie
          options={defaultOptions}
          height={"100vh"}
          isStopped={this.state.isStopped}
          isPaused={this.state.isPaused}
        />
        {/* <button
         style={buttonStyle}
         onClick={() => this.setState({ isStopped: true })}
       >
         stop
       </button>
       <button
         style={buttonStyle}
         onClick={() => this.setState({ isStopped: false })}
       >
         play
       </button>
       <button
         style={buttonStyle}
         onClick={() => this.setState({ isPaused: !this.state.isPaused })}
       >
         pause
       </button> */}
      </div>
    );
  }
}