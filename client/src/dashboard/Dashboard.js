import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../actions/profileActions';
import Spinner from '../common/Spinner';
import { Link } from 'react-router-dom';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { student } = this.props.auth;

    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // checks if student has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <Link to={`/profile/${profile.handle}`} className="btn btn-info">
              view profile
            </Link>

            <Link to="/edit-profile" className="btn btn-primary">
              edit profile
            </Link>
          </div>
        );
      } else {
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome,</p>
            <p>You have not yet created a profile, pls add some info</p>
            <Link to="/create-profile" className="btn btn-info btn-lg">
              Create profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="container">
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
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard);
