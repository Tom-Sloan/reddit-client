import React, { useEffect } from "react";

import styles from "./Posts.module.css";

import { Comments } from "../Comments/Comments";

export function Post({ elm, element, windowHeight, isPopUp }) {
  const handleClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={`${styles.row} Post`}>
      {isPopUp && (
        <div className={styles.modal}>
          <div className={styles.modal_content} onClick={handleClick}>
            <div>
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

              <Comments
                key={elm.id}
                isPopUp={isPopUp}
                postId={elm.id}
                windowHeight={windowHeight}
              />
            </div>
          </div>
        </div>
      )}
      <div>
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

        <Comments
          key={elm.id}
          isPopUp={isPopUp}
          postId={elm.id}
          windowHeight={windowHeight}
        />
      </div>
    </div>
  );
}
