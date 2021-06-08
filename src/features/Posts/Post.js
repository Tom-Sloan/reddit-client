import React, { useEffect } from "react";

import styles from "./Posts.module.css";

import { Comments } from "../Comments/Comments";

export function Post({ elm, element, windowHeight, isPopUp }) {
  useEffect(() => {
    console.log(isPopUp);
  }, [isPopUp]);
  return (
    <div className={`${styles.row} Post`}>
      {(!isPopUp && 
        <div className={styles.innerContainer}>
          {element}
          {element && <hr />}
          <div className={styles.title}>
            <div className={styles.likes}>
              <div className={styles.heart} />
              <span className={styles.ups}>{elm.ups}</span>
              <span className={styles.author}>@{elm.author}</span>
            </div>
            <strong>{elm.title}</strong>
          </div>
          <hr />

          <Comments key={elm.id} postId={elm.id} windowHeight={windowHeight} />
        </div>
      )|| <p>hey</p>}
    </div>
  );
}
