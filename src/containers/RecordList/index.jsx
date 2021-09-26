import React from 'react';
import './index.scss';

const RecordList = props => {
  const listRecords = props.records.map((record, index) =>
    <li className='collection-item clickable' key={index}
      onClick={() => {
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
        <li className='collection-header'>
          <span className='col1'>S. No.</span>
          <span className='col2'>ID</span>
          <span className='col3'>Name</span>
        </li>
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