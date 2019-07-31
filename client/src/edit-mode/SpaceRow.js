import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class SpaceRow extends Component {
  handledelete = id => {
    // console.log(id)
    axios
      .post("/user/:userName/:spaceName/delete", { id })
      .then(() => console.log("done"))
      .catch(err => console.log(err));
    this.props.updateState(id);
  };
  render() {
    // console.log(this.props)

    return (
      <div className="spacerow">
        <button
          className="deletebutton"
          onClick={() => this.handledelete(this.props.space._id)}
        >
          X
        </button>
        <Link to={`/user/${this.props.username}/${this.props.space.title}`}>
          <h4>{this.props.space.title}</h4>
        </Link>
      </div>
    );
  }
}
