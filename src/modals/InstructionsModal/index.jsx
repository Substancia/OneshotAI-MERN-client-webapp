import React from "react";
import './index.scss';

const InstructionsModal = props =>
  <div className='InstructionsModal'>
    <div className='Modal-bg' />
    <div className='Modal-box'>
      <div className='Modal-header'>Specific information for testing</div>
      <div className='Modal-content'>
        <ol>
          <li>A single college is added from 'Pune' to display the 'no similar colleges' scenario.</li>
          <li>If looking for some IDs to search for, try amongst:-
            <ul className='ID-list'>
              <li>6151abdd08aa5bfdac8eb8c2</li>
              <li>6151abdd08aa5bfdac8eb8fe</li>
              <li>6151abdd08aa5bfdac8eb914</li>
            </ul>
          </li>
          <li>Click on the information icon to see this modal again.</li>
        </ol>
        <div className='Modal-close-button'>
          <button className='waves-effect waves-light btn-small'
            onClick={props.closeModal}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>

export default InstructionsModal;