import React from 'react';
import './App.css';
import Navbar from './components/Navbar'
import { Switch, Route } from 'react-router-dom';
import Login from './components/Login'
import Signup from './components/Signup'

function App() {

  return (
    <div className="App">
      <h1>Simma</h1>
      <Navbar />
      <Switch>
        {/* <Route exact path='/' component={Home}/> */}
        <Route path='/login' component={Login} />
        <Route path='/signup' component={Signup} />
      </Switch>
    </div>
  );
}

export default App;
