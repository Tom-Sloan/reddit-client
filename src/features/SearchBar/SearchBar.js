import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './SearchBar.module.css'
import {loadSubredditData} from '../Subreddit/subredditSlice'

export function SearchBar() {
  const dispact = useDispatch()
  const _handleKeyDown = (e) =>  {
    if (e.key === 'Enter') {
      console.log('do validate');
      console.log(e.target.value)
      dispact(loadSubredditData({subreddit:'search', search:e.target.value}))
    }
  }
  return (
    <input 
      className={styles.searchBar}
      key="random1"
      placeholder={"search country"}
      onKeyDown={_handleKeyDown}
      /> 
  );
}
