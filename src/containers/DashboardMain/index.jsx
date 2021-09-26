/*
Dashboard for main screen, when no college/student is clicked. Displays generic info
on data indexed in DB, 2 charts categorizing the colleges, which upon clicking
refreshes the list rendered below to show filtered list of colleges.
While state-wise categorisation of colleges is done here real-time, course-wise
categorisation is received from server as object and converted to list.
*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'react-google-charts';
import './index.scss';

// collecting backend address and port
const ADDRESS = process.env.REACT_APP_ADDRESS;
const PORT = process.env.REACT_APP_PORT;

// initializing DashboardMain component, for main screen charts
const DashboardMain = props => {
  const [collegeList, setCollegeList] = useState([]);   // to store list of all colleges (for categorizing)
  const [courses, setCourses] = useState({});   // to store college categories based on courses offered

  useEffect(() => {
    // collecting list of all colleges
    axios.post(`${ADDRESS}:${PORT}/record`)
      .then(res => setCollegeList(res.data));
    
    // collecting college categories (based on courses offered) data from server
    axios.post(`${ADDRESS}:${PORT}/record/catByCourses`)
      .then(res => setCourses(res.data));
  }, []);     // empty dependency list to refresh only once per loading

  // filter function for when clicked on Piechart
  const getCollegeFromStatesChart = chartWrapper => {
    const selection = chartWrapper.getChart().getSelection();
    if(selection.length === 1) {
      const value = chartWrapper.getDataTable().getValue(selection[0].row, 0);
      // setting query for DB query in next render
      props.setSelectedRecordQuery({ query: { state: value } });
    }
  }

  // filter function for when clicked on Barchart
  const getCollegeFromCoursesChart = chartWrapper => {
    const selection = chartWrapper.getChart().getSelection();
    if(selection.length === 1) {
      const value = chartWrapper.getDataTable().getValue(selection[0].row, 0);
      // setting filtered list of colleges (previously collected) for next render
      props.setRecords(courses[value]);
    }
  }

  // setting data (state-wise) appropriately for react-google-charts
  // (iterating through each college and incrementing count in each state)
  const byState = [['Colleges', 'Number per state']];
  var indexByState = {};
  collegeList.map(college => {
    if(!(college.state in indexByState)) indexByState[college.state] = 0;
    indexByState[college.state] += 1;
    return null;
  });
  // converting object data into list data
  Object.keys(indexByState).map(item => byState.push([item, indexByState[item]]));

  // setting data (course-wise) appropriately for react-google-charts
  const byCourses = [['Courses', 'Colleges per course']];
  Object.keys(courses).map(item => byCourses.push([item, courses[item].length]));

  return (
    <div className='Dashboard-Colleges'>
      {/* general info section regarding data indexed */}
      <div className='TableInfo'>
        <h5>Table Information</h5>
        <p>Colleges indexed: {props.collegeCount}</p>
      </div>

      <div className='Charts-Container'>
        {/* loading piechart with state-wise data */}
        <Chart
          width={'330px'} height={'180px'}
          chartType='PieChart' loader={<div>Loading Chart...</div>}
          data={byState}
          chartEvents={[{ eventName: 'select', callback: ({ chartWrapper }) => getCollegeFromStatesChart(chartWrapper) }]}
          options={{ title: 'Colleges By State', pieHole: 0.4 }}
          rootProps={{ 'data-testid': '1' }}
        />

        {/* loading barchart with course-wise data */}
        <Chart
          width={'345px'} height={'180px'}
          chartType='BarChart' loader={<div>Loading Chart...</div>}
          data={byCourses}
          chartEvents={[{ eventName: 'select', callback: ({ chartWrapper }) => getCollegeFromCoursesChart(chartWrapper) }]}
          options={{
            title: 'Colleges By Courses Offered',
            chartArea: { width: '50%' },
            hAxis: { title: 'Number of colleges' },
            legend: 'none'
          }}
          rootProps={{ 'data-testid': '2' }}
        />
      </div>
    </div>
  );
};

export default DashboardMain;