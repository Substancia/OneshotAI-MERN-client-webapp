import React, { useState } from 'react';
import './index.scss';

const RecordList = props => {
  const [searchKey, setSearchKey] = useState('');

  const handleSearchKey = e => setSearchKey(e.target.value);
  const handleSearchKeyEnter = e => {
    var code = null;
    if(e.key !== undefined) code = e.key;
    else if(e.keyIdentifier !== undefined) code = e.keyIdentifier;
    else if(e.keyCode !== undefined) code = e.keyCode;
    if(code === 13) handleSearchSubmit();
  }
  const handleSearchSubmit = () => {
    props.setSelectedRecordQuery({ type: 'searchKey', query: { name: searchKey } });
    setSearchKey('');
  }

  const listRecords = props.records.map((record, index) =>
    <li className='collection-item' key={index}
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
    <div>
      <button onClick={() => props.setSelectedRecordQuery({})}>Reset</button>
      {/* <button
        onClick={() => {
          if(props.queryHistory.length > 0)
            props.setQueryHistory(props.queryHistory.slice(0, -1))}
        }
      >
        Back
      </button> */}
      {
        ('student' in props.selectedRecordQuery) ?
          <button
            onClick={() => props.setSelectedRecordQuery({ college: props.selectedRecordQuery.college })}
          >
            College details
          </button> :
          null
      }
      <input
        type='text' value={searchKey} placeholder='Search by name'
        onChange={handleSearchKey} onKeyPress={handleSearchKeyEnter}
      />
      <button
        onClick={handleSearchSubmit}
      >
        Search
      </button>
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