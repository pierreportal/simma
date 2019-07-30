import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Protected from "./components/Protected";
import Profile from "./components/Profile";
<<<<<<< HEAD
import EditMap from "./edit-mode/EditMap";
import BackGround from "./exp-mode/components/Background";
import { NONAME } from "dns";
=======
import EditMap from "./edit-mode/EditMap"
import SpaceMap from "./edit-mode/SpaceMap"
>>>>>>> af28da21f663f98cc0741e68fd8919af92814413

class App extends React.Component {
  state = {
    user: this.props.user
  };

  setUser = user => {
    this.setState({
      user: user
    });
  };
  render() {
    return (
      <div className="App">
        {/* <h1>Simma</h1> */}
        <Navbar user={this.state.user} />
        {/* <BackGround /> */}

        <Switch>
          <Route
            path="/login"
            render={props => (
              <Login user={this.state.user} setUser={this.setUser} {...props} />
            )}
          />

          <Route path="/signup" component={Signup} />

          <Protected
            exact
            path="/user/:userName"
            redirectPath="/login"
            setUser={this.setUser}
            user={this.state.user}
            component={Profile}
          />

          <Protected
            exact
            path="/user/:userName/new-space"
            redirectPath="/login"
            setUser={this.setUser}
            user={this.state.user}
            component={EditMap} />

          <Route exact path='/user/:userName/:spaceName' component={SpaceMap} />


        </Switch>
      </div>
    );
  }
}

export default App;
