import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { signinStudent } from '../../actions/authActions';

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // componentDidMount() {
  //   if (this.props.auth.isAuthenticated) {
  //     this.props.history.push('/dashboard')
  //   }
  // }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.auth.isAuthenticated) {
    //   this.props.history.push('/dashboard');
    // }
    // This must come first before the first if statement above
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const student = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.signinStudent(student);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="container auth mt-2 mb-2">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="card card-body p-5 shadow-lg">
              <h4 className="text-center display-4 mb-4">Sign In</h4>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.email
                    })}
                    placeholder="Enter Email"
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
                    value="SigIn"
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

SignIn.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  signinStudent: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { signinStudent }
)(withRouter(SignIn));
