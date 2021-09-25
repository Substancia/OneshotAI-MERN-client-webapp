import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RecordList, DashboardColleges, DashboardStudents } from './containers';

const ADDRESS = process.env.REACT_APP_ADDRESS || 'localhost';
const PORT = process.env.REACT_APP_PORT || '8080';

const App = () => {
  const [selectedRecord, setSelectedRecord] = useState({});
  const [records, setRecords] = useState([]);

  useEffect(() => {
    axios.post(`http://${ADDRESS}:${PORT}/record`,
      selectedRecord
    ).then(res => setRecords(res.data));
  }, [selectedRecord]);

  return (
    <div className="App">
      <header className="App-header">
        {
          selectedRecord.college == null ?
            <DashboardColleges
              setRecords={setRecords}
              setSelectedRecord={setSelectedRecord}
            /> :
            <DashboardStudents />
        }
        <RecordList
          selectedRecord={selectedRecord}
          setSelectedRecord={setSelectedRecord}
          records={records}
        />
      </header>
    </div>
  );
}

export default App;
