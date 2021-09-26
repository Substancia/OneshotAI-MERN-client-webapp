/*
App structure: Navbar, a dashboard (to show charts or details),
a list display (recycled to print any given set of records), a horizontal list display
of cards (to display similar colleges only when drilled down to a college).
*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RecordList, DashboardMain, DashboardDetails, SimilarCollegesHorList } from './containers';
import { Preloader } from './components';
import Navbar from './components/Navbar';
import './App.scss';

// collecting backend address and port
const ADDRESS = process.env.REACT_APP_ADDRESS;
const PORT = process.env.REACT_APP_PORT;

// initializing app
const App = () => {
  const [selectedRecordQuery, setSelectedRecordQuery] = useState({}); // for current query parameters to server
  const [selectedRecord, setSelectedRecord] = useState({}); // for current selected record
  const [records, setRecords] = useState([]);               // for all records returned by server
  const [collegeCount, setCollegeCount] = useState(0);      // for total number of colleges in DB

  const [isLoading, setLoading] = useState(true);
  
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      // to collect records from server based on query passed
      await axios.post(`${ADDRESS}:${PORT}/record`,
        selectedRecordQuery
      ).then(res => setRecords(res.data));

      // to get total number of colleges in DB
      await axios.post(`${ADDRESS}:${PORT}/record/getNumberOfColleges`)
        .then(res => setCollegeCount(res.data.count));

      // to collect and serve details on selected college/student
      var obj = {};
      if('student' in selectedRecordQuery) obj.collection = 'student';
      else if('college' in selectedRecordQuery) obj.collection = 'college';
      // if a college or student is selected from list, send name field for DB query
      if('collection' in obj) {
        obj.query = { name: selectedRecordQuery[obj.collection] };
        await axios.post(`${ADDRESS}:${PORT}/record/details`, obj)
          .then(res => setSelectedRecord(res.data));
      }
      setLoading(false);
    }
    fetchData();
  }, [selectedRecordQuery]);    // refresh when a new query is assigned to current query

  return (
    <div className="App">
      {
        isLoading ? <Preloader /> : null
      }
      <header className="App-header">
        {/* Navbar element, contains search field and necessary buttons in different stages */}
        <Navbar
          isLoading={isLoading}
          selectedRecordQuery={selectedRecordQuery}
          setSelectedRecordQuery={setSelectedRecordQuery}
        />

        {/* Conditionally render DashboardMain if in main screen, or DashboardDetails
            to display college/student details */}
        {
          ('college' in selectedRecordQuery || 'student' in selectedRecordQuery) ?
            <DashboardDetails
              record={selectedRecord}
            /> :
            <DashboardMain
              collegeCount={collegeCount}
              setRecords={setRecords}
              setSelectedRecordQuery={setSelectedRecordQuery}
            />
        }

        {/* List component used for listing all types of records.
            Same component is recycled and populated with colleges/students list accordingly. */}
        <RecordList
          selectedRecordQuery={selectedRecordQuery}
          setSelectedRecordQuery={setSelectedRecordQuery}
          records={records}
        />

        {/* Conditionally render list of similar colleges only when a college is clicked */}
        {
          ('college' in selectedRecordQuery && records.length > 0) ?
            <SimilarCollegesHorList
              collegeName={{ college: { name: selectedRecordQuery.college } }}
              setSelectedRecordQuery={setSelectedRecordQuery}
            /> :
            null
        }
      </header>
    </div>
  );
}

export default App;
