import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Comments.module.css";
import { selectComments } from "./commentsSlice";
import { selectCommentsToDisplay } from "../Posts/postSlice";

export function Comments({ postId, windowHeight }) {
  const [innerHeight, setHeight] = useState(0);
  const allComments = useSelector(selectComments);
  const maxCommentLength = useSelector(selectCommentsToDisplay);

  let element;
  // console.log('allcomments')
  // console.log(allComments)
  if (allComments[postId].length > 0) {
    element = allComments[postId].map((comment, index) => {
      if (index < allComments[postId].length - 1)
        return (
          <div
            id={"comment_" + postId + "-" + index}
            className={styles.comment}
          >
            <p>{comment}</p>
            <hr />
          </div>
        );
      return (
        <div id={"comment_" + postId + "-" + index} className={styles.comment}>
          <p>{comment}</p>
          <div className={styles.endpoint}>
            
          </div>
        </div>
      );
    });
  } else {
    element = <div>No Comments</div>;
  }

  useEffect(() => {
    let height = 0;
    let limit =
      allComments[postId].length > maxCommentLength - 1
        ? maxCommentLength
        : allComments[postId].length;
    for (let i = 0; i < limit; i++) {
      try {
        height += document.getElementById(
          "comment_" + postId + "-" + i
        ).clientHeight;
      } catch (e) {
        console.log("Error Generating Comments");
        console.log(e);
      }
    }
    setHeight(Math.min(Math.ceil(windowHeight / 3), height + 40));
  }, []);

  return (
    <div
      style={{ height: innerHeight }}
      key={"comment_" + postId}
      className={styles.comments}
    >
      {element}
    </div>
  );
}
