import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { signupStudent } from '../../actions/authActions';
import PropTypes from 'prop-types';

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
    // this.props.history allow us to redirect from within our action

    this.props.signupStudent(newStudent, this.props.history);
  }

  render() {
    // Pulling the errors (which is errors: {}) from the component state above
    const { errors } = this.state;

    return (
      <div className="container auth mt-2 mb-2">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="card card-body p-5 shadow-lg">
              <h4 className="text-center display-4 mb-4">Sign Up</h4>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.username
                    })}
                    placeholder="Username"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChange}
                  />
                  {errors.username && (
                    // displays error msgs from backend through the form
                    <div className="invalid-feedback">{errors.username}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.email
                    })}
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.password
                    })}
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.password2
                    })}
                    placeholder="Confirm Password"
                    name="password2"
                    value={this.state.password2}
                    onChange={this.onChange}
                  />
                  {errors.password2 && (
                    <div className="invalid-feedback">{errors.password2}</div>
                  )}
                </div>
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

// Any property in your component should be map to proptype
SignUp.propTypes = {
  signupStudent: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

// Gettng the auth state(in authReducer) into our component. mapStateToProps is a function
const mapStateToProps = state => ({
  // For state.auth, the auth is coming from index reducer. While auth (the first one) in auth: state.auth is just a PROPERTY u can call it anything in ur component
  auth: state.auth,
  errors: state.errors
});

// Map actions from redux here
export default connect(
  mapStateToProps,
  { signupStudent }
  // withRouter here allow us to redirect from signup component to the desired page inside authAction
)(withRouter(SignUp));
