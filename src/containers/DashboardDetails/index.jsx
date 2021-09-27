/*
For a selected college/student (this component is recycled for both), details are
collected from server and displayed with field names translated to appropriate labels.
*/

import React from 'react';
import './index.scss';

// dictionary to translate DB collection field names to appropriate labels to display
const labelDictionary = {
  _id: 'ID',
  name: 'Name',
  year: 'Year',
  city: 'City',
  state: 'State',
  country: 'Country',
  students: 'Students',
  courses: 'Courses',
  college: 'College',
  collegeId: 'College ID',
  skills: 'Skills',
};

// initializing DashboardDetails component, for displaying details of colleges/students
const DashboardDetails = props => {
  return (
    <div className='Dashboard-Students'>
      <h5>About { 'student' in props.recordType ? 'Student' : 'College' }</h5>
      {
        // iterating through props.record object (contains clicked college/student details)
        Object.keys(props.record).map((info, index) =>
          <div key={index}>
            <p>
              <span>
                {labelDictionary[info]}   {/* translating DB collection fields */}
              </span>: <span>
                {/* Conditionally printing single value or list found in props.record object */}
                {
                  Array.isArray(props.record[info]) ?
                    props.record[info].join(', ') :
                    props.record[info]
                }
              </span>
            </p>
          </div>
        )
      }
    </div>
  );
};

export default DashboardDetails;