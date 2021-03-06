import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signout } from '../../actions/authActions';
import Img from '../../img/avatar.png';

class Navbar extends Component {
  onSignoutClick(e) {
    e.preventDefault();
    this.props.signout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <a
            href="#!"
            onClick={this.onSignoutClick.bind(this)}
            className="nav-link"
          >
            <img
              className="rounded-circle img-responsive"
              src={Img}
              alt="profile"
              style={{ width: '25px', marginRight: '5px' }}
            />
            SignOut
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link text-primary" to="/sign-up">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-primary" to="/sign-in">
            Sign In
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-md navbar-dark py-3 bg-dark">
        <div className="container">
          <Link className="navbar-brand text-primary" to="/">
            <i className="fa fa-graduation-cap mr-1" />
            School Management App
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { signout }
)(Navbar);
