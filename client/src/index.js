import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios'

axios
  .get("/auth/loggedin")
  .then(response => {
    ReactDOM.render(
      // axios check user 
      <Router>
        <App user={response.data} />
      </Router>,
      // end
      document.getElementById('root'));
  })
  .catch(err => {
    console.log(err);
  });

serviceWorker.unregister();
