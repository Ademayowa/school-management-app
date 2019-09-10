import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Home extends Component {
  // This ensures a login student is NOT able to visit d landing page once they are on dia dashboard
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  render() {
    return (
      <div className="container-fluid home">
        <div className="row opacity">
          <div className="col-sm-12">
            <h4 className="display-4 text-center mt-5 mb-5 text-white">
              School Management App
            </h4>
          </div>

          <div className="mx-auto mt-5">
            <Link to="/sign-up" className="btn btn-info btn-lg mr-2">
              Sign Up
              <i className="fa fa-user-plus ml-1" />
            </Link>

            <Link to="/sign-in" className="btn btn-outline-light btn-lg mr-2">
              Sign In
              <i className="fa fa-sign-in ml-1" />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Home);
