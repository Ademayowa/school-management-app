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
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentStudent, logoutUser } from './actions/authActions';

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentStudent(decoded));

  // Check for expired token
  // const currentTime = Date.now() / 1000;
  // if (decoded.exp < currentTime) {
  // Logout user
  // store.dispatch(logoutUser());
  // Clear current Profile
  // store.dispatch(clearCurrentProfile());
  // Redirect to login
  // window.location.href = '/login';
  // }
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
