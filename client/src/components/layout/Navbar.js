import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-sm shadow-sm p-3 navbar-info">
        <div className="container">
          <Link className="navbar-brand" to="/">
            School Management System
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/sign-in">
                  SignIn
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/sign-up">
                  SignUp
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
