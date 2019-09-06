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

    this.props.registerStudent(newStudent, this.props.history);
  }

  render() {
    // errors from the state above which was initially empty
    const { errors } = this.state;

    return (
      <div className="container auth mt-2 mb-2">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="card card-body p-5 mt-4 shadow-lg">
              <h4 className="text-center display-4 mb-4">
                <span className="text-info">Sign</span>
                Up
              </h4>
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
                  placeholder="Enter Email"
                  name="email"
                  type="email"
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
                <input
                  value="Sign up"
                  type="submit"
                  className="btn btn-info btn-lg btn-block z-depth-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToprops = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToprops,
  { registerStudent }
  // withRouter allows us to redirect from an action into a component
)(withRouter(SignUp));
