import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createProfile, getCurrentProfile } from '../../actions/profileActions';
import TextFieldGroup from '../../common/TextFieldGroup';
import { withRouter } from 'react-router-dom';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      handle: '',
      gender: '',
      address: '',
      religion: '',
      nameoffather: '',
      nameofmother: '',
      parentemail: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // using getCurrentProfile here so that the profile form is filled with profile data & we can edit
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      this.setState({
        firstname: profile.firstname,
        lastname: profile.lastname,
        handle: profile.handle,
        gender: profile.gender,
        address: profile.address,
        religion: profile.religion,
        nameoffather: profile.nameoffather,
        nameofmother: profile.nameofmother,
        parentemail: profile.parentemail
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      gender: this.state.gender,
      address: this.state.address,
      handle: this.state.handle,
      religion: this.state.religion,
      nameoffather: this.state.nameoffather,
      nameofmother: this.state.nameofmother,
      parentemail: this.state.parentemail
    };

    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to="/dashboard" className="btn btn-info mt-4 mb-4">
              Back
            </Link>
            <h2 className="mt-4 mb-4">Edit Profile</h2>
            <div className="center-line mb-4" />

            <div className="card card-body mt-4 mb-4 shadow-lg">
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="First Name"
                  name="firstname"
                  value={this.state.firstname}
                  onChange={this.onChange}
                  error={errors.firstname}
                />
                <TextFieldGroup
                  placeholder="Last Name"
                  name="lastname"
                  value={this.state.lastname}
                  onChange={this.onChange}
                  error={errors.lastname}
                />
                <TextFieldGroup
                  placeholder="Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                />
                <TextFieldGroup
                  placeholder="Gender"
                  name="gender"
                  value={this.state.gender}
                  onChange={this.onChange}
                  error={errors.gender}
                />
                <TextFieldGroup
                  placeholder="Address"
                  name="address"
                  value={this.state.address}
                  onChange={this.onChange}
                  error={errors.address}
                />
                <TextFieldGroup
                  placeholder="Religion"
                  name="religion"
                  value={this.state.religion}
                  onChange={this.onChange}
                  error={errors.religion}
                />
                <TextFieldGroup
                  placeholder="Father's Name"
                  name="nameoffather"
                  value={this.state.nameoffather}
                  onChange={this.onChange}
                  error={errors.nameoffather}
                />
                <TextFieldGroup
                  placeholder="Mother's Name"
                  name="nameofmother"
                  value={this.state.nameofmother}
                  onChange={this.onChange}
                  error={errors.nameofmother}
                />
                <TextFieldGroup
                  placeholder="Parent Email"
                  name="parentemail"
                  value={this.state.parentemail}
                  onChange={this.onChange}
                  error={errors.parentemail}
                />
                <div className="form-group">
                  <input
                    type="submit"
                    value="edit"
                    className="btn btn-info btn-lg btn-block"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(EditProfile));
