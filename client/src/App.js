import React from 'react';
import './App.css';
import Navbar from './components/Navbar'
import { Switch, Route } from 'react-router-dom';
import Login from './components/Login'
import Signup from './components/Signup'
import Protected from "./components/Protected";
import Profile from "./components/Profile";
import EditMap from "./edit-mode/EditMap"
import SpaceMap from "./edit-mode/SpaceMap"

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
      <div className="App" >
        <h1>Simma</h1>
        <Navbar user={this.state.user} />
        <Switch>
          <Route path='/login' render={(props) => <Login user={this.state.user} setUser={this.setUser} {...props} />} />

          <Route path='/signup' component={Signup} />

          <Route path='/logout' component={Login} />

          {/*
            ACCESS SPACE AND DISPLAY, DISTANCE FUNCTION NOT WORKING ON ROBERT'S COMPUTER
            */}





          <Protected exact path="/user/:userName" redirectPath="/login"
            setUser={this.setUser}
            user={this.state.user}
            component={Profile} />

          <Protected exact path="/user/:userName/new-space" redirectPath="/login"
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
