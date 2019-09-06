import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Home';
import SignUp from './components/auth/SignUp';
import SignIn from './components/auth/SignIn';
import Navbar from './components/layout/Navbar';

import setAuthToken from './utils/setAuthToken';
import { setCurrentStudent } from './actions/authActions';
import jwt_decode from 'jwt-decode';

// check for token.
if (localStorage.jwtToken) {
  // set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // decode token and get student info and expiration
  const decoded = jwt_decode(localStorage.jwtToken);
  // set student and isAuthenticated
  store.dispatch(setCurrentStudent(decoded));
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Home} />
            <Route exact path="/sign-up" component={SignUp} />
            <Route exact path="/sign-in" component={SignIn} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
