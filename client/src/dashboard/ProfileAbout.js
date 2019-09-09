import React, { Component } from 'react';

class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="container profile">
        <div className="row">
          <div className="col-sm-8 mx-auto  shadow-lg mt-4">
            <h4 className="mt-4 mb-4">About Me</h4>
            <div className="center-line" />

            <div>
              <p>
                {' '}
                <strong>First Name : </strong> {profile.firstname}
              </p>
              <p>
                {' '}
                <strong>Last Name : </strong> {profile.lastname}
              </p>
              <p>
                {' '}
                <strong>Gender : </strong> {profile.gender}
              </p>
              <p>
                {' '}
                <strong>Religion : </strong> {profile.religion}
              </p>
              <p>
                {' '}
                <strong>Father's Name : </strong> {profile.nameoffather}
              </p>
              <p>
                {' '}
                <strong>Mother's Name : </strong> {profile.nameofmother}
              </p>
              <p>
                {' '}
                <strong>Parent Email : </strong> {profile.parentemail}
              </p>
              <p>
                {' '}
                <strong>Parent Number : </strong> {profile.parentnumber}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ProfileAbout;
