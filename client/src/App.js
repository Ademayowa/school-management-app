import React, { Component } from 'react';
import './App.css';
// import 'materialize-css/dist/css/materialize.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from './components/auth/SignUp';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SignUp />
      </div>
    );
  }
}

export default App;
