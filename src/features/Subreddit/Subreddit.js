import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {loadSubredditData} from './subredditSlice'
import styles from './Subreddit.module.css'


export function Subreddit({name}) {
    const dispatch = useDispatch()
  function handleClick(e){
    dispatch(loadSubredditData(name))
  }
  return (
    <div key= {name} className='SubredditButtoncontainer'>
      <button className={styles.SubredditButton} onClick={handleClick}>{name}</button>
    </div>
  );
}
