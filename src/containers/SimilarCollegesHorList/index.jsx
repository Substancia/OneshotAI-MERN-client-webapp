import axios from "axios";
import React, { useEffect, useState } from "react";
import './index.scss';

const ADDRESS = process.env.REACT_APP_ADDRESS || 'localhost';
const PORT = process.env.REACT_APP_PORT || '8080';

const SimilarCollegesHorList = props => {
  const [similar, setSimilar] = useState([]);

  useEffect(() =>
    axios.post(`http://${ADDRESS}:${PORT}/record/getSimilarColleges`,
      props.collegeName
    ).then(res => setSimilar(res.data.similar))
  , [props.collegeName]);

  const similarCards = data => {
    if(data.length > 0)
      return (
        data.map((college, index) =>
          <div key={index} className='SimilarCollegesCard' onClick={() => props.setSelectedRecordQuery({ college: college.name })}>
            <h6>{college.name}</h6>
            <p>{college._id}</p>
          </div>
        )
      );
    return (
      <div>Looks like there aren't many similar colleges in this region...</div>
    );
  }

  return (
    <div className='SimilarCollegesHorList'>
      {similarCards(similar)}
    </div>
  );
}

export default SimilarCollegesHorList;