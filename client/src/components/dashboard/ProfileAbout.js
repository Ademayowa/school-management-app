import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="container profile">
        <div className="row">
          <div className="col-sm-10 m-auto mt-4 pb-5">
            <Link to="/dashboard" className="btn blue-gradient mt-4 mb-4">
              Back
            </Link>

            <div className="col-sm-8 card card-body shadow-lg mt-4">
              <h2 className="mb-4">About Me</h2>
              <div className="center-line mb-4" />

              <p>
                <strong>First Name : </strong>{' '}
                {profile.firstname.charAt(0).toUpperCase() +
                  profile.firstname.slice(1)}
              </p>
              <p>
                <strong>Last Name : </strong>{' '}
                {profile.lastname.charAt(0).toUpperCase() +
                  profile.lastname.slice(1)}
              </p>
              <p>
                <strong>Gender : </strong>{' '}
                {profile.gender.charAt(0).toUpperCase() +
                  profile.gender.slice(1)}
              </p>
              <p>
                <strong>Religion : </strong>{' '}
                {profile.religion.charAt(0).toUpperCase() +
                  profile.religion.slice(1)}
              </p>
              <p>
                <strong>Father's Name : </strong>{' '}
                {profile.nameoffather.charAt(0).toUpperCase() +
                  profile.nameoffather.slice(1)}
              </p>
              <p>
                <strong>Mother's Name : </strong>
                {profile.nameofmother.charAt(0).toUpperCase() +
                  profile.nameofmother.slice(1)}
              </p>
              <p>
                <strong>Parent Email : </strong> {profile.parentemail}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ProfileAbout;
