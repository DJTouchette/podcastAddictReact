/**
*
* PodCard
*
*/

import React from 'react';
import styles from './styles.css';

export function PodCard(props){
    return (
      <div className={`card center`} style={{padding: '0', width: '350px'}}>
        <div className="card-image waves-effect waves-block waves-light">
          <img className="activator" src={props.image}/>
        </div>
        <div className="card-content activator">
          <span style={{cursor: 'pointer'}} className='activator'><a></a><i className="material-icons right">more_vert</i></span>
          <span className="card-title activator grey-text text-darken-4 truncate"><p className='flow-text'>{props.title}</p></span>
          <p className='flow-text activator truncate'>{props.artist}</p>
          <div className='card-action'>
          <a className="waves-effect waves-light btn cyan" href={props.href} target='_blank'>Check it out On Itunes</a>
          </div>
        </div>
        <div className="card-reveal">
          <span className="card-title grey-text text-darken-4">{props.title}<i className="material-icons right">close</i></span>
          <p className='flow-text'>{props.summary}</p>
        </div>
      </div>
    );
}

export default PodCard;
