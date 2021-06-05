import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {selectFavoriteSubreddits} from '../features/Subreddit/subredditSlice'
import {Subreddit} from '../features/Subreddit/Subreddit'
import './styles.css'
import {TitleHeader} from './titleHeader'
import ScrollMenu from 'react-horizontal-scrolling-menu';
// import ScrollMenu from 'react-horizontal-scrolling-menu';

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
  console.log('enter')
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}
const handleLeave = (e) => {
  console.log('leave')
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}


export function HeaderBar() {

  
  const subreddits = useSelector(selectFavoriteSubreddits)
  const [selected, setSelected] = useState(subreddits[0])
  const menu = Menu(subreddits,selected)
  
 
  return (
    <div className='HeaderBar' onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <div className='header'>
        <TitleHeader />
      </div>
      <div className='scrollMenu'>
        <ScrollMenu
          
          data={menu}
          arrowLeft={ArrowLeft}
          arrowRight={ArrowRight}
          selected={selected}
          onSelect={setSelected}
/>
      </div>
      
    </div>
  );
}

// One item component
// selected prop will be passed
const MenuItem = ({text, selected}) => {
  return <div
    className={`menu-item ${selected ? 'active' : ''}`}
    >{text}</div>;
};

// All items component
// Important! add unique key
// subreddits.map(elm => <Subreddit name = {elm} />)
export const Menu = (list, selected) =>
  list.map(el => {
    return <Subreddit name = {el} text={el} key={el} selected={selected} />;
  });


const Arrow = ({ text, className }) => {
  return (
    <div
      className={className}
    >{text}</div>
  );
};

const ArrowLeft = Arrow({ text: '<', className: 'arrow-prev' });
const ArrowRight = Arrow({ text: '>', className: 'arrow-next' });