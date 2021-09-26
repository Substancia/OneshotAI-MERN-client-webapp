import React, { useState } from "react";

const Navbar = props => {
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
    </div>
  );
}

export default Navbar;