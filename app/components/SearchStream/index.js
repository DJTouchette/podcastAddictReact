/**
*
* SearchStream
*
*/

import React from 'react';
import PodCard from 'components/PodCard';

import styles from './styles.css';

function SearchStream(props) {
    const stream = props.list.map( (pod, index) => {
      let image = pod.artworkUrl600;
      let artist = pod.artistName;
      let price = pod.trackPrice;
      let releaseDate = null;
      let href = pod.collectionViewUrl;
      let summary = null;
      let title = pod.collectionCensoredName;
      let itunesID = artist.id;

      return (
        <div key={index + 100}className={`${styles.indexz}`}>
          <PodCard
            header={`#${index + 1}`}
            fullScreen={false}
            key={index}
            image={image}
            artist={artist}
            price={price}
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

export default SearchStream;
