import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './TitleHeader.module.css'
import {selectColumnNumber, selectImageLink, updateTitleHeader} from './titleHeaderSlice'
import {SearchBar} from '../SearchBar/SearchBar'

export function TitleHeader() {
  
  const dispatch = useDispatch();
  const columnNumber = useSelector(selectColumnNumber)
  const columnLayoutImage = useSelector(selectImageLink)
  
  const handleClick = (e)=>{
    console.log("clicked!")
    console.log(columnNumber)
    console.log(columnLayoutImage)
    dispatch(updateTitleHeader())
  }
  
  return (
    <div className={styles.titleHeader}>
      <div className={styles.smallHeaderOption}>
        <img className = {styles.logoImage} src="/./logo_v3.png" alt="redditProfit" />
      </div>
      <div className={styles.largeHeaderOption}>
        <SearchBar />
      </div>
      <div className={styles.smallHeaderOption}>
        <img onClick={handleClick} className = {`${styles.logoImage} ${styles.changeLayoutIcon}`} src={columnLayoutImage} alt="redditProfit" />
      </div>
    </div>
  );
}
