import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signinStudent } from '../../actions/authActions';
import TextFieldGroup from '../../common/TextFieldGroup';

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

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  // checks if student has token
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }

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

    // call the function from ur action
    this.props.signinStudent(student);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="container auth mb-2">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="card card-body p-5 mt-4 shadow-lg">
              <h2 className="text-center display-4 mb-4">
                <span className="text-primary">Sign</span>
                In
              </h2>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Enter Email Address"
                  name="email"
                  type="email"
                  required="required"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                />
                <TextFieldGroup
                  placeholder="Enter Password"
                  name="password"
                  type="password"
                  required="required"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />
                <div>
                  <button className="btn blue-gradient btn-lg btn-block">
                    Signin
                  </button>
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
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { signinStudent }
)(SignIn);
