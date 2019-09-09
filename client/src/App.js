import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import PrivateRoute from './common/PrivateRoute';
import store from './store';
import { signout } from './actions/authActions';
import { clearCurentProfile } from './actions/profileActions';

import './App.css';
import 'mdbootstrap/css/bootstrap.min.css';
import 'mdbootstrap/css/mdb.min.css';
import 'font-awesome/css/font-awesome.min.css';

import Home from './Home';
import SignUp from './components/auth/SignUp';
import SignIn from './components/auth/SignIn';
import Navbar from './components/layout/Navbar';

import setAuthToken from './utils/setAuthToken';
import { setCurrentStudent } from './actions/authActions';
import jwt_decode from 'jwt-decode';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './createProfile/CreateProfile';
import Profile from './components/dashboard/Profile';

// check for token.
if (localStorage.jwtToken) {
  // set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // decode token and get student info and expiration
  const decoded = jwt_decode(localStorage.jwtToken);
  // set student and isAuthenticated
  store.dispatch(setCurrentStudent(decoded));

  // Make token expires in 1hr
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // signout user
    store.dispatch(signout());

    store.dispatch(clearCurentProfile());
    // Redirect to login
    // window.location = '/sign-in';
  }
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
            <Route exact path="/profile/:handle" component={Profile} />
            {/* private route here ensures that once a student signs out, he is not able to visit his/her dashboard anymore. This
            logic resides in PrivateRoute.js. */}
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>

            <Switch>
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
