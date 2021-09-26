/*
The component used to display any given set of records in a scrollable list.
The component is populated with colleges/students records in different contexts.
*/

import React from 'react';
import './index.scss';

// initializing RecordList component, to display list of records (colleges/students)
const RecordList = props => {
  // iterating through list of records and displaying
  const listRecords = props.records.map((record, index) =>
    <li className='collection-item clickable' key={index}
      onClick={() => {      // conditionally setting onClick prop depending on if data is college/student
        if(!('college' in props.selectedRecordQuery))
          props.setSelectedRecordQuery({ college: record.name })
        else
          props.setSelectedRecordQuery({ ...props.selectedRecordQuery, student: record.name })
      }}
    >
      <span className='col1'>{index + 1}</span>
      <span className='col2'>{record._id}</span>
      <span className='col3'>{record.name}</span>
    </li>
  );

  return (
    <div className='RecordList'>
      <ul className='collection with-header'>
        {/* list header */}
        <li className='collection-header'>
          <span className='col1'>S. No.</span>
          <span className='col2'>ID</span>
          <span className='col3'>Name</span>
        </li>

        {/* if no records available to be displayed */}
        {
          props.records.length > 0 ?
            listRecords :
            <div>No search results found!</div>
        }
      </ul>
    </div>
  );
}

export default RecordList;