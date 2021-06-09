import React, { useEffect, useState } from "react";

import styles from "./Posts.module.css";
import bodyStyles from "../../components/bodyStyles.module.css";
import { Post } from "./Post";

export function Posts({ elm, windowHeight }) {
  const [popUpState, setPopUpState] = useState(false);
  const [headerSetting, setHeaderSetting] = useState();
  const [bodySetting, setBodySetting] = useState();
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
  } else {
    element = <img src={elm.img} className={styles.gridImg} alt={elm.title} />;
  }

  const handleClick = (e) => {
    console.log("clicked");
    const header = document.getElementById("HeaderBar_id");
    const body = document.querySelector("#bodySection_id");

    const scrollUp = bodyStyles.scrollUp;
    const scrollDown = bodyStyles.scrollDown;
    const animation = bodyStyles.animation;
    
    if (!popUpState) {
      
      header.classList.remove(animation);
      body.classList.remove(animation);

      header.classList.remove(scrollDown);
      body.classList.remove(scrollDown);

      header.classList.add(scrollUp);
      body.classList.add(scrollUp);

    }else{ 
      header.classList.add(animation);
      body.classList.add(animation);
    }

    
    setPopUpState((prev) => !prev);

    // const body = document.querySelector("#bodySection_id");
    // document.documentElement.style.setProperty("--popUpHeight", body.scrollTop);
  };

  useEffect(() => {
    console.log("changed!");
  }, [popUpState]);
  return (
    <div onClick={handleClick}>
      {
        <Post
          elm={elm}
          element={element}
          isPopUp={popUpState}
          windowHeight={windowHeight}
        />
      }
    </div>
  );
}
