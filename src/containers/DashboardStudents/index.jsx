import React from 'react';
import './index.scss';

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

const DashboardStudents = props => {
  return (
    <div className='Dashboard-Students'>
      <h5>About College</h5>
      {
        Object.keys(props.record).map((info, index) =>
          <div key={index}>
            <p>
              <span>
                {labelDictionary[info]}
              </span>: <span>
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

export default DashboardStudents;