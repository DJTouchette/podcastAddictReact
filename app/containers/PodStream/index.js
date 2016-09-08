/*
 *
 * PodStream
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import PodCard from 'components/PodCard';

import styles from './styles.css';
export function PodStream(props) { // eslint-disable-line react/prefer-stateless-function
    const stream = props.list.map( (pod, index) => {
      let image = pod['im:image'][2].label;
      let artist = pod['im:artist'].label;
      let price = pod['im:price'].label;
      let releaseDate = pod['im:releaseDate'].label;
      let href = pod.link.attributes.href;
      let summary = pod.summary.label;
      let title = pod['im:name'].label;
      let itunesID = pod.id['im:id'];

      return (
        <div key={index + 100}className={`${styles.indexz}`}>
          <PodCard
            header={`#${index + 1}`}
            fullScreen={false}
            key={index}
            image={image}
            artist={artist}
            price={price}
            releaseDate={releaseDate}
            href={href}
            summary={summary}
            title={title}
          />
        </div>
      );
    });

    return (
      <div className={`${styles.flexContainer}`}>
        {stream}
      </div>
    );
}


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapDispatchToProps)(PodStream);
