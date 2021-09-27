/*
Simple circle preloader component for disabling screens during server communication.
MaterializeCSS component.
*/

import React from "react";
import './index.scss';

const Preloader = props =>
  <div className={`preloader-container ${props.fullscreen ? 'fullscreen' : null}`}>
    {props.fullscreen ? <div className='preloader-bg' /> : null}
    <div className='preloader-wrapper big active'>
      <div className='spinner-layer spinner-blue-only'>
        <div className='circle-clipper left'>
          <div className='circle' />
        </div>
        <div className='gap-patch'>
          <div className='circle' />
        </div>
        <div className='circle-clipper right'>
          <div className='circle' />
        </div>
      </div>
    </div>
  </div>

export default Preloader;