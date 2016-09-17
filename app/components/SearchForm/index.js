/**
*
* SearchForm
*
*/

import React from 'react';


import styles from './styles.css';

function SearchForm(props) {
  return (
    <div className={styles.searchForm}>
      <div className="row">

        <div className="row">
          <div className={`input-field col s12 m6 offset-m3 ${styles.inputColor}`}>
            <input value={props.formValue} placeholder='Enter any keywords you like' onChange={props.handleForm.bind(this)} id="icon_prefix" type="text" />
            <label htmlFor="icon_prefix2"></label>
          </div>
        </div>
        <a onClick={props.handleClick.bind(this)} className="waves-effect waves-light btn cyan">Search</a>
      </div>
    </div>
  );
}

export default SearchForm;
