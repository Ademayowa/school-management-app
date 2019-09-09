import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProfileByHandle } from '../actions/profileActions';
import Spinner from '../common/Spinner';
import ProfileAbout from './ProfileAbout';

class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }

  render() {
    const { profile, loading } = this.props.profile;

    let profileContent;

    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div>
          <ProfileAbout profile={profile} />
        </div>
      );
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h2 className="mt-4 mb-4">Profile</h2>
            <div className="center-line mb-4" />
            {profileContent}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getProfileByHandle }
)(Profile);
