import React from 'react';
import './index.scss';

const RecordList = props => {
  const listRecords = props.records.map((record, index) =>
    <li className='collection-item' key={index}
      onClick={() => {
        if(!('college' in props.selectedRecord))
          props.setSelectedRecord({ college: record.name })}
      }
    >
      <span className='col1'>{index + 1}</span>
      <span className='col2'>{record._id}</span>
      <span className='col3'>{record.name}</span>
    </li>
  );

  return (
    <div>
      <button onClick={() => props.setSelectedRecord({})}>Back</button>
      <ul className='collection with-header'>
        <li className='collection-header'>
          <span className='col1'>S. No.</span>
          <span className='col2'>ID</span>
          <span className='col3'>Name</span>
        </li>
        {listRecords}
      </ul>
    </div>
  );
}

export default RecordList;