import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RecordList, DashboardColleges, DashboardStudents, SimilarCollegesHorList } from './containers';
import Navbar from './components/Navbar';

const ADDRESS = process.env.REACT_APP_ADDRESS || 'localhost';
const PORT = process.env.REACT_APP_PORT || '8080';

const App = () => {
  const [selectedRecordQuery, setSelectedRecordQuery] = useState({});
  const [selectedRecord, setSelectedRecord] = useState({});
  const [records, setRecords] = useState([]);
  // const [queryHistory, setQueryHistory] = useState([]);

  useEffect(() => {
    axios.post(`http://${ADDRESS}:${PORT}/record`,
      selectedRecordQuery
    ).then(res => setRecords(res.data));

    var obj = {};
    if('student' in selectedRecordQuery) obj.collection = 'student';
    else if('college' in selectedRecordQuery) obj.collection = 'college';
    if('collection' in obj) {
      obj.query = { name: selectedRecordQuery[obj.collection] };
      axios.post(`http://${ADDRESS}:${PORT}/record/details`, obj)
        .then(res => setSelectedRecord(res.data));
    }
    // if(queryHistory.length)
    //   setQueryHistory(...queryHistory, selectedRecordQuery);
  }, [selectedRecordQuery]);

  return (
    <div className="App">
      <header className="App-header">
        <Navbar
          selectedRecordQuery={selectedRecordQuery}
          setSelectedRecordQuery={setSelectedRecordQuery}
        />
        {
          ('college' in selectedRecordQuery || 'student' in selectedRecordQuery) ?
            <DashboardStudents
              record={selectedRecord}
            /> :
            <DashboardColleges
              setRecords={setRecords}
              setSelectedRecordQuery={setSelectedRecordQuery}
            />
        }
        <RecordList
          selectedRecordQuery={selectedRecordQuery}
          setSelectedRecordQuery={setSelectedRecordQuery}
          records={records}
          // queryHistory={queryHistory}
          // setQueryHistory={setQueryHistory}
        />
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
