import React, { Component } from 'react';

class SignUp extends Component {
  render() {
    return (
      <div className="container-fluid login mt-5">
        <form>
          <div className="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control form-control-lg"
              id="exampleInputPassword1"
              placeholder="Password"
            />
            <button className="btn btn-info btn-lg btn-block mt-4">
              SignUp
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default SignUp;
