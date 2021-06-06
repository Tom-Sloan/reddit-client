import React from 'react';
import styles from '../../components/bodyStyles.module.css';

import { Comments } from '../Comments/Comments';

export function Posts({elm}) {

  let element;

  if (elm.is_video) {
    // element = <embed type="video/webm" className={styles.gridImg} src={elm.img} />;
    element = (
      <video className={styles.gridImg} controls={true} autoPlay={true} muted={true} loop={true} playsInline={true} >
        <source src={elm.media.reddit_video.fallback_url} type="video/mp4"  />
        Unsupported
      </video>
    )
    // element = <img src={elm.thumbnail} className={styles.gridImg} alt={elm.title} />;
  } else if (!elm.is_media) {
    element = <img src="https://i.redd.it/c0kjct56ayc21.jpg" className={styles.gridImg} alt={elm.title} />;
  } else {
    element = <img src={elm.img} className={styles.gridImg} alt={elm.title} />;
  }

  // console.log(elm);
  
  return (
    <div className = {styles.row} elm={elm} >
      {element}
      <hr/>
      <p className={styles.title} ><strong>{elm.title}</strong></p>
      <hr/>
      <Comments key={elm.id} postId={elm.id} />

    </div>
  );
}
