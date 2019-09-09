import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileActions';

import Spinner from '../../common/Spinner';
import { Link } from 'react-router-dom';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { student } = this.props.auth;
    const { profile, loading } = this.props.profile;

    // student logged having a profile
    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // check if student has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div style={{ marginLeft: '-15px' }}>
            <Link to={`/profile/${profile.handle}`} className="btn btn-info">
              View profile
            </Link>

            <Link to="/edit-profile" className="btn btn-dark">
              Edit profile
            </Link>

            <Link to="/add-education" className="btn btn-primary">
              Add Education
            </Link>
          </div>
        );
      } else {
        // student logged in but no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome, {student.username}</p>
            <p>You have not yet created a profile, pls add some info</p>
            <Link to="/create-profile" className="btn btn-info btn-lg">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="container bg-white p-4 mt-4">
        <div className="row">
          <div className="col-sm-12">
            <h2 className="mt-4 mb-4">Student Dashboard</h2>
            <div className="center-line mb-4" />
            {dashboardContent}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  // we need auth becos the student token is in the state in redux
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard);
