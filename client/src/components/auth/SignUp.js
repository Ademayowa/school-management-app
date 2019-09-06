import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { registerStudent } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // this runs when component receives new properties. nextProps is just a parameter
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newStudent = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    // calling resgisterUser from authAction. this.props.history allows us to redirect from within resgisterUser action to signup component
    this.props.registerStudent(newStudent, this.props.history);
  }

  render() {
    // errors from the state above which was initially empty
    const { errors } = this.state;

    return (
      <div className="container auth mt-2 mb-2">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="card card-body p-5 shadow-lg">
              <h4 className="text-center display-4 mb-4">SignUp</h4>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Enter your username"
                  name="username"
                  type="text"
                  value={this.state.username}
                  onChange={this.onChange}
                  error={errors.username}
                />

                <TextFieldGroup
                  placeholder="Enter your email"
                  name="email"
                  type="text"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                />
                <TextFieldGroup
                  placeholder="Enter your password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />
                <TextFieldGroup
                  placeholder="Confirm password"
                  name="password2"
                  type="password"
                  value={this.state.password2}
                  onChange={this.onChange}
                  error={errors.password2}
                />
                <div className="form-group">
                  <input
                    value="SignUp"
                    type="submit"
                    className="btn btn-outline-info btn-lg btn-block"
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

const mapStateToprops = state => ({
  // auth in (state.auth) is coming from index reducer. while auth(the property) is a property u can call it anything you want. Here, mapStateToprops basically renders whats in ur authReducer to this component
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToprops,
  { registerStudent }
  // withRouter allows us to redirect from an action into a component
)(withRouter(SignUp));
