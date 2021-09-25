import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'react-google-charts';
import './index.scss';

const ADDRESS = process.env.REACT_APP_ADDRESS || 'localhost';
const PORT = process.env.REACT_APP_PORT || '8080';

const DashboardColleges = props => {
  const [collegeList, setCollegeList] = useState([]);
  const [courses, setCourses] = useState({});

  useEffect(() => {
    axios.post(`http://${ADDRESS}:${PORT}/record`)
      .then(res => setCollegeList(res.data));
    axios.post(`http://${ADDRESS}:${PORT}/record/catByCourses`)
      .then(res => setCourses(res.data));
  }, []);

  const getCollegeFromStatesChart = chartWrapper => {
    const selection = chartWrapper.getChart().getSelection();
    if(selection.length === 1) {
      const value = chartWrapper.getDataTable().getValue(selection[0].row, 0);
      props.setSelectedRecordQuery({ query: { state: value } });
    }
  }

  const getCollegeFromCoursesChart = chartWrapper => {
    const selection = chartWrapper.getChart().getSelection();
    if(selection.length === 1) {
      const value = chartWrapper.getDataTable().getValue(selection[0].row, 0);
      props.setRecords(courses[value]);
    }
  }

  const byState = [['Colleges', 'Number per state']];
  var indexByState = {};
  collegeList.map(college => {
    if(!(college.state in indexByState)) indexByState[college.state] = 0;
    indexByState[college.state] += 1;
    return null;
  });
  Object.keys(indexByState).map(item => byState.push([item, indexByState[item]]));

  const byCourses = [['Courses', 'Colleges per course']];
  Object.keys(courses).map(item => byCourses.push([item, courses[item].length]));

  return (
    <div className='Dashboard-Colleges'>
      <Chart
        width={'500px'} height={'180px'}
        chartType='PieChart' loader={<div>Loading Chart...</div>}
        data={byState}
        chartEvents={[{ eventName: 'select', callback: ({ chartWrapper }) => getCollegeFromStatesChart(chartWrapper) }]}
        options={{ title: 'By State', pieHole: 0.4 }}
        rootProps={{ 'data-testid': '1' }}
      />
      <Chart
        width={'500px'} height={'180px'}
        chartType='Bar' loader={<div>Loading Chart...</div>}
        data={byCourses}
        chartEvents={[{ eventName: 'select', callback: ({ chartWrapper }) => getCollegeFromCoursesChart(chartWrapper) }]}
        options={{ title: 'By Courses' }}
        rootProps={{ 'data-testid': '2' }}
      />
    </div>
  );
};

export default DashboardColleges;