import React from 'react';
import './index.scss';

const DashboardStudents = props => {
  return (
    <div className='Dashboard-Students'>
      {
        Object.keys(props.record).map((info, index) =>
          <div key={index}>
            <span>
              {info}
            </span>: <span>
              {
                Array.isArray(props.record[info]) ?
                  props.record[info].join(', ') :
                  props.record[info]
              }
            </span>
          </div>
        )
      }
    </div>
  );
};

export default DashboardStudents;