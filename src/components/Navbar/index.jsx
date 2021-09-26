import React, { useState } from "react";
import './index.scss';

const Navbar = props => {
  const [searchKey, setSearchKey] = useState('');

  const handleSearchKey = e => setSearchKey(e.target.value);
  const handleSearchKeyEnter = e => {
    if(e.charCode === 13) handleSearchSubmit();
  }
  const handleSearchSubmit = () => {
    if(searchKey.length) {
      props.setSelectedRecordQuery({ type: 'searchKey', query: { name: searchKey } });
      setSearchKey('');
    }
  }

  return (
    <nav>
      <div className='nav-wrapper Navbar'>
        <div className='ButtonGroup left'>
          <button className='waves-effect waves-light btn'
            onClick={() => props.setSelectedRecordQuery({})}
          >
            Show Colleges
          </button>
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
              <button className='waves-effect waves-light btn'
                onClick={() => props.setSelectedRecordQuery({ college: props.selectedRecordQuery.college })}
              >
                College details
              </button> :
              null
          }
        </div>
        <div className='SearchGroup right'>
          <form onSubmit={e => e.preventDefault()}>
            <div className='input-field'>
              <label class="label-icon" for="search"><i class="material-icons">search</i></label>
              <input
                type='text' value={searchKey} placeholder='Search by name'
                onChange={handleSearchKey} onKeyPress={handleSearchKeyEnter}
              />
              <button className='waves-effect waves-light btn'
                onClick={handleSearchSubmit}
              >
                <i class="material-icons right">send</i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;