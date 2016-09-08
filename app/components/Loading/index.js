/**
*
* Loading
* @Return A simple spinner that is centered vertically and horizontally.
*/

import React from 'react';
import styles from './styles.css';

function Loading() {
  return (
    <div className={`preloader-wrapper big active ${styles.stuckInTheMiddle} `}>
    <div className="spinner-layer spinner-cyan-only">
      <div className="circle-clipper left">
        <div className="circle"></div>
      </div><div className="gap-patch">
        <div className="circle"></div>
      </div><div className="circle-clipper right">
        <div className="circle"></div>
      </div>
    </div>
  </div>
  );
}

export default Loading;
