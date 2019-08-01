import React from 'react';
import './App.css';
import Navbar from './components/Navbar'
import { Switch, Route } from 'react-router-dom';
import Login from './components/Login'
import Signup from './components/Signup'
import Protected from "./components/Protected";
import Profile from "./components/Profile";
// import EditMap from "./edit-mode/EditMap"
// import SpaceMap from "./edit-mode/SpaceMap"
import Landing from './components/Landing'
import Sounds from './sounds/Sounds';

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

        <Navbar user={this.state.user} setUser={this.setUser} />
        <Switch>

          <Route exact path='/' component={Landing} />

          <Route path='/login' render={(props) => <Login user={this.state.user} setUser={this.setUser} {...props} />} />

          <Route path='/signup' component={Signup} />
          {/* <Route path='/signup' render={(props) => <Signup user={this.state.user} setUser={this.setUser} {...props} />} /> */}


          <Route path='/logout' component={Login} />


          <Protected exact path="/user/:userName" redirectPath="/login"
            setUser={this.setUser}
            user={this.state.user}
            component={Profile} />

          <Protected exact path="/user/:userName/new-space" redirectPath="/login"
            setUser={this.setUser}
            user={this.state.user}
            component={Sounds} />
          {/* component={RobertSounds}     which will render <EditMap/> */}

          <Route exact path='/user/:userName/:spaceName' render={(props) => <Sounds user={this.state.user} {...props} />} />
          {/* component={RobertSounds}     which will render <SpaceMap/> */}
          {/* render={(props) => <Login user={this.state.user} setUser={this.setUser} {...props} />} /> */}



        </Switch>
      </div>
    );
  }
}

export default App;
