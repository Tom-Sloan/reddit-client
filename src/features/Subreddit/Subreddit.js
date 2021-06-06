import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {loadSubredditData} from './subredditSlice'
import styles from './Subreddit.module.css'


export function Subreddit({name, text, selected}) {
  const dispatch = useDispatch()
  
  function handleClick(e){
    console.log(name)
    dispatch(loadSubredditData({subreddit:name, search:false}))
  }

  return (
    <div key= {name} className='SubredditButtoncontainer'>
      <button className={`${styles.SubredditButton} ${selected ? styles.activeBtn : ''}`} onClick={handleClick} >{text}</button>
    </div>
  );
}
