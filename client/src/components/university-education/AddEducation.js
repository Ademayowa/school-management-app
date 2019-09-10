import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUniversityEducation } from '../../actions/profileActions';
import TextFieldGroup from '../../common/TextFieldGroup';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

class AddEducation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schoolname: '',
      schooladdress: '',
      country: '',
      graduationyear: '',
      grade: '',
      courseofstudy: '',
      descriptionofcourse: '',
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

  onSubmit(e) {
    e.preventDefault();

    const universityData = {
      schoolname: this.state.schoolname,
      schooladdress: this.state.schooladdress,
      country: this.state.country,
      graduationyear: this.state.graduationyear,
      grade: this.state.grade,
      courseofstudy: this.state.courseofstudy,
      descriptionofcourse: this.state.descriptionofcourse
    };

    this.props.getUniversityEducation(universityData, this.props.history);
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
            <h2 className="mt-4 mb-4">University Education</h2>
            <div className="center-line mb-4" />

            <div className="card card-body mt-4 mb-4 shadow-lg">
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="School Name"
                  name="schoolname"
                  value={this.state.schoolname}
                  onChange={this.onChange}
                  error={errors.schoolname}
                />
                <TextFieldGroup
                  placeholder="School Address"
                  name="schooladdress"
                  value={this.state.schooladdress}
                  onChange={this.onChange}
                  error={errors.schooladdress}
                />
                <TextFieldGroup
                  placeholder="Country"
                  name="country"
                  value={this.state.country}
                  onChange={this.onChange}
                  error={errors.country}
                />
                <TextFieldGroup
                  placeholder="Grduation Year"
                  name="graduationyear"
                  value={this.state.graduationyear}
                  onChange={this.onChange}
                  error={errors.graduationyear}
                />
                <TextFieldGroup
                  placeholder="Grade"
                  name="grade"
                  value={this.state.grade}
                  onChange={this.onChange}
                  error={errors.grade}
                />
                <TextFieldGroup
                  placeholder="Course of study"
                  name="courseofstudy"
                  value={this.state.courseofstudy}
                  onChange={this.onChange}
                  error={errors.courseofstudy}
                />
                <TextFieldGroup
                  placeholder="Description of course"
                  name="descriptionofcourse"
                  value={this.state.descriptionofcourse}
                  onChange={this.onChange}
                  error={errors.descriptionofcourse}
                />
                <div className="form-group">
                  <input
                    type="submit"
                    value="add education"
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
  { getUniversityEducation }
)(withRouter(AddEducation));
