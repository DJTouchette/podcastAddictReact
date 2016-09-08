/**
*
* NoResults
*
*/

import React from 'react';


import styles from './styles.css';

function NoResults(props) {
  return (
    <div className={`center ${styles.noResults}`}>
      <h1 className='flow-text'>{`Couldn't find any podcasts with: ${props.searchTerm}`}</h1>
    </div>
  );
}

export default NoResults;
