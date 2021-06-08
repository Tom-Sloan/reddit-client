import React from 'react';
import styles from './bodyStyles.module.css'

export function Footer() {
  
  return (
    <div id='LoadingFooter' className={styles.LoadingFooterBox}>
        <div className={styles.footerLoader}></div>
    </div>
  );
}
