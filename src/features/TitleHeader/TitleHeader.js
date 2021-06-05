import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './TitleHeader.module.css'
import {SubredditsBar} from '../Subreddit/SubredditsBar'

export function TitleHeader() {
  
  return (
    <div className={styles.titleHeader}>
      <div className={styles.smallHeaderOption}>
        <img className = {styles.logoImage} src="/./logo_v3.png" alt="redditProfit" />
      </div>
      <div className={styles.largeHeaderOption}>
        <p style={{backgroundColor:'orange', width:'100%', marginBlockStart: '0em', marginBlockEnd: '0em'}}>hey</p>
      </div>
      <div className={styles.smallHeaderOption}>
        <img className = {styles.logoImage} src="/./grid-icon_2.png" alt="redditProfit" />
      </div>
    </div>
  );
}
