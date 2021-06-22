import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./TitleHeader.module.css";
import {
  selectColumnNumber,
  selectImageLink,
  updateTitleHeader,
} from "./titleHeaderSlice";
import { SearchBar } from "../SearchBar/SearchBar";

export function TitleHeader() {
  const dispatch = useDispatch();
  const columnNumber = useSelector(selectColumnNumber);
  const columnLayoutImage = useSelector(selectImageLink);
  const ref = useRef(null);

  const handleClick = (e) => {
    dispatch(updateTitleHeader());
  };

  const handleMove = (e) => {
    const docStyle = document.documentElement.style;
    const boundingClientRect = ref.current.getBoundingClientRect();
    const x = e.clientX - boundingClientRect.left;
    const y = e.clientY - boundingClientRect.top;

    const xc = boundingClientRect.width / 2;
    const yc = boundingClientRect.height / 2;

    const dx = x - xc;
    const dy = y - yc;

    docStyle.setProperty("--rx", `${dy / -1}deg`);
    docStyle.setProperty("--ry", `${dx / 10}deg`);
  };

  const handleLeave = (e) => {
    const docStyle = document.documentElement.style;
    docStyle.setProperty("--ty", "0");
    docStyle.setProperty("--rx", "0");
    docStyle.setProperty("--ry", "0");
  };

  const handleUp = (e) => {
    const docStyle = document.documentElement.style;
    docStyle.setProperty("--tz", "-12px");
  };

  const handleDown = (e) => {
    const docStyle = document.documentElement.style;
    docStyle.setProperty("--tz", "-25px");
  };
  const style = {
    fontSize: ref.current && ref.current.height||'20px',
    textAlign: 'center'
  }
  return (
    <div id='titleHeader' className={styles.titleHeader}>
      <div className={styles.smallHeaderOption}>
        {/* <img className = {styles.logoImage} src="/./resources/logo.png" alt="redditProfit" /> */}
        <a
          ref={ref}
          className={styles.parallaxBtn}
          href="https://www.tom-sloan.com/"
          data-title="Portfolio"
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          onMouseDown={handleDown}
          onMouseUp={handleUp}
        ></a>
      </div>
      <div className={styles.largeHeaderOption}>
        <SearchBar />
      </div>
      <div className={styles.smallHeaderOption}>
        <span onClick={handleClick} style={style}>{'\u2666'.repeat(columnNumber)}</span>
      </div>
      
    </div>
  );
}

/*
<img
          onClick={handleClick}
          className={`${styles.logoImage} ${styles.changeLayoutIcon}`}
          src={columnLayoutImage}
          alt="redditProfit"
        />
*/