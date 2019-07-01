import React, { Component } from 'react';

class SignIn extends Component {
  render() {
    return (
      <div className="container auth mt-2 mb-2">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="card card-body p-5 shadow-lg">
              <h4 className="text-center display-4 mb-4">Sign In</h4>
              <form>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Username"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                  />
                </div>
                <div className="form-group">
                  <input
                    value="SigIn"
                    type="submit"
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

export default SignIn;
