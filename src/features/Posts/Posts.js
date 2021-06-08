import React, { useState } from "react";

import styles from "./Posts.module.css";

import {Post} from './Post'

export function Posts({ elm, windowHeight }) {
  const [popUpState, setPopUpState] = useState(false);

  let element;

  if (elm.is_video) {
    // element = <embed type="video/webm" className={styles.gridImg} src={elm.img} />;
    element = (
      <video
        className={styles.gridImg}
        controls={true}
        autoPlay={true}
        muted={true}
        loop={true}
        playsInline={true}
      >
        <source src={elm.media.reddit_video.fallback_url} type="video/mp4" />
        Unsupported
      </video>
    );
    // element = <img src={elm.thumbnail} className={styles.gridImg} alt={elm.title} />;
  } else if (!elm.is_media) {
    element = null;
    /*
    (
      <img
        src="https://i.redd.it/c0kjct56ayc21.jpg"
        className={styles.gridImg}
        alt={elm.title}
      />
    );
    */
  } else {
    element = <img src={elm.img} className={styles.gridImg} alt={elm.title} />;
  }

  const handleClick = (e) => {
    setPopUpState((prev) => !prev);
  };

  return (
    <div className={`${styles.row} PostTile`} elm={elm} onClick={handleClick}>
      {<Post elm={elm} element={element} isPopUp= {popUpState} windowHeight={windowHeight}/>}
    </div>
  );
}
