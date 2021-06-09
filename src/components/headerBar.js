import React from 'react';
import {TitleHeader} from '../features/TitleHeader/TitleHeader'
import {SubredditsBar} from '../features/Subreddit/SubredditsBar'
import styles from './bodyStyles.module.css';
import { useEffect, useState } from 'react';
// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
let keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
let supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; } 
  }));
} catch(e) {}

let wheelOpt = supportsPassive ? { passive: false } : false;
let wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';


const handleEnter = (e) =>{

  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

const handleLeave = (e) => {

  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}


export function HeaderBar() {
  
  useEffect(() => {
    const updateWindowDimensions = () => {
      const newHeight = document.getElementById('HeaderBar_id').clientHeight;
      document.documentElement.style.setProperty("--headerHeight", (newHeight+'px'));
    };

    window.addEventListener("resize", updateWindowDimensions);
    updateWindowDimensions()
    return () => window.removeEventListener("resize", updateWindowDimensions) 

  }, []);

  return (
    <div id='HeaderBar_id'  className={`${styles.HeaderBar} ${styles.animation}`} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <TitleHeader />
      <SubredditsBar />
    </div>
  );
}
