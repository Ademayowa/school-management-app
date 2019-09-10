import React, { Component } from 'react';

class Education extends Component {
  render() {
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
      <div className="container mt-4">
        <div className="row">
          <div className="col-sm-12 m-auto">
            <h2 className="shadow-sm text-info mt-4 pt-2 pb-2">
              <i className="fa fa-graduation-cap" />
              Education
            </h2>

            <table
              className="table table-responsive-lg 
              p-4 shadow-sm
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
