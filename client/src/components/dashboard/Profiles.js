import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProfiles } from '../../actions/profileActions';
import Spinner from '../../common/Spinner';
import Img from '../../img/avatar.png';

class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }

  render() {
    // profiles and loading here is coming profile reducer state
    const { profiles, loading } = this.props.profiles;

    let profilesContent;
    if (profiles === null || loading) {
      profilesContent = <Spinner />;
    } else {
      // Checks if there are profiles
      if (profiles.length > 0) {
        profilesContent = profiles.map(profile => (
          <li
            key={profile._id}
            className="list-group-item text-muted mt-2 mb-2 p-4 shadow-lg"
          >
            <p>
              <strong>Last Name : {profile.lastname}</strong>
            </p>
            <p>
              <strong>First Name : {profile.firstname}</strong>
            </p>
            <p>
              <strong>Parent Email : {profile.parentemail}</strong>
            </p>
            <p className="float-right">
              <img
                src={Img}
                alt={profile.lastname}
                className="img-responsive rounded-circle"
                style={{
                  width: '100px',
                  marginTop: '-160px'
                }}
              />
            </p>
          </li>
        ));
      } else {
        profilesContent = <h4>No Profiles Found</h4>;
      }
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h2 class="mt-4 mb-4">All Profiles</h2>
            <div className="center-line mb-4" />
            {profilesContent}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  // state.profile comes from index reducer
  profiles: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);
