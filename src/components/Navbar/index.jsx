import React, { useState } from "react";
import './index.scss';

// Initializing Navbar component
const Navbar = props => {
  const [searchKey, setSearchKey] = useState('');   // to store search key (name/ID)

  const handleSearchKey = e => setSearchKey(e.target.value);  // handle search field value update
  const handleSearchKeyEnter = e => {               // for the Enter-key to submit search
    if(e.charCode === 13) handleSearchSubmit();
  }
  const handleSearchSubmit = () => {                // search key is sent to server for matching
    if(searchKey.length) {
      props.setSelectedRecordQuery({ type: 'searchKey', query: { name: searchKey } });
      setSearchKey('');
    }
  }

  return (
    <nav>
      <div className='nav-wrapper Navbar'>
        <div className='ButtonGroup left'>
          {/* Button to take us back to main screen */}
          <button className='waves-effect waves-light btn'
            onClick={() => props.setSelectedRecordQuery({})}
            disabled={props.isLoading ? true : false}
          >
            List Colleges
          </button>

          {/* Conditionally render button to display college details,
              only if student details are being displayed.
              Both details use and recycle same DashboardDetails component. */}
          {
            ('student' in props.selectedRecordQuery) ?
              <button className='waves-effect waves-light btn'
                onClick={() => props.setSelectedRecordQuery({ college: props.selectedRecordQuery.college })}
                disabled={props.isLoading ? true : false}
              >
                College details
              </button> :
              null
          }
        </div>

        {/* Search field and associated elements */}
        <div className='SearchGroup right'>
          <form onSubmit={e => e.preventDefault()}>   {/* to prevent form from redirecting */}
            <div className='input-field'>
              <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
              <input
                type='text' value={searchKey} placeholder='Search by name or ID'
                onChange={handleSearchKey} onKeyPress={handleSearchKeyEnter}
              />
              <button className='waves-effect waves-light btn'
                onClick={handleSearchSubmit}
                disabled={props.isLoading ? true : false}
              >
                <i className="material-icons right">send</i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;