/*
The component used to display similar colleges to the clicked college, when a college
is clicked. The display is a horizontal list rendered below list of students, with
each college displayed in separate cards. List of similar colleges is collected
from server.
*/

import axios from "axios";
import React, { useEffect, useState } from "react";
import './index.scss';

// collecting backend address and port
const ADDRESS = process.env.REACT_APP_ADDRESS;
const PORT = process.env.REACT_APP_PORT;

// initializing SimilarCollegesHorList, for displaying similar colleges
const SimilarCollegesHorList = props => {
  const [similar, setSimilar] = useState([]);   // to store list of similar colleges

  // collecting similar colleges list from server
  useEffect(() => {
    if('college' in props.collegeName) {
      axios.post(`${ADDRESS}:${PORT}/record/getSimilarColleges`,
        props.collegeName
      ).then(res => setSimilar(res.data.similar))
    }
  }, [props.collegeName]);    // refresh when selected college changes

  // iterate through similar colleges list and show them as horizontal list of cards
  const similarCards = data => {
    if(data.length > 0)
      return (
        data.map((college, index) =>
          <div className='card SimilarCollegesCard clickable'>
            <div key={index} className='card-content' onClick={() => props.setSelectedRecordQuery({ college: college.name })}>
              <h6>{college.name}</h6>
              <p>{college._id}</p>
            </div>
          </div>
        )
      );
    // if similar colleges list is empty
    return (
      <div>Looks like there aren't many similar colleges in this region...</div>
    );
  }

  return (
    <div className='SimilarCollegesWrapper card'>
      <h5>Colleges similar to {props.collegeName.college.name}:-</h5>
      <div className='SimilarCollegesHorList'>
        {similarCards(similar)}     {/* similar colleges list passed to iterating function */}
      </div>
    </div>
  );
}

export default SimilarCollegesHorList;