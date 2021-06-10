import React from "react";
import { useDispatch } from "react-redux";
import {
  loadSubredditData,
  updatePostDisplayLimit,
} from "./subredditSlice";
import styles from "./Subreddit.module.css";

export function Subreddit({ name, text, selected }) {
  const dispatch = useDispatch();

  function handleClick(e) {
    dispatch(loadSubredditData({ subreddit: name, search: false }));
    try{
      document.querySelector("#bodySection_id").scrollTo(0, 0);
    } catch(e) {
      console.log(e)
    }
   
    dispatch(updatePostDisplayLimit(25));
  }

  return (
    <div key={name} className="SubredditButtoncontainer">
      <button
        className={`${styles.SubredditButton} ${
          selected ? styles.activeBtn : ""
        }`}
        onClick={handleClick}
      >
        {text}
      </button>
    </div>
  );
}
