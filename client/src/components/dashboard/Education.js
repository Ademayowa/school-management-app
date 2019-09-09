import React, { Component } from 'react';

class Education extends Component {
  render() {
    // the education in this.props.education is coming from Education component on the dashboard i.e education={profile.universityeducation}
    const education = this.props.education.map(edu => (
      <tr key={edu._id}>
        <td>{edu.schoolname}</td>
        <td>{edu.schooladdress}</td>
        <td>{edu.country}</td>
        <td>{edu.graduationyear}</td>
        <td>{edu.grade}</td>
        <td>{edu.courseofstudy}</td>
        <td>{edu.descriptionofcourse}</td>
      </tr>
    ));
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h4 className="mt-5 mb-4">University Education</h4>
            <div className="center-line"></div>
            <table
              className="table table-responsive-lg 
             mt-4 p-4 shadow-lg
              table-bordered"
            >
              <thead>
                <tr>
                  <th>School Name</th>
                  <th>Address</th>
                  <th>Country</th>
                  <th>Graduation Year</th>
                  <th>Grade</th>
                  <th>Course of study</th>
                  <th>Description of course</th>
                </tr>
                {education}
              </thead>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Education;
