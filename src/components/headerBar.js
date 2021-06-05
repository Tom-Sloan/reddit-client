import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {selectFavoriteSubreddits} from '../features/Subreddit/subredditSlice'
import {Subreddit} from '../features/Subreddit/Subreddit'
import './styles.css'
import {TitleHeader} from './titleHeader'
import ScrollMenu from 'react-horizontal-scrolling-menu';
// import ScrollMenu from 'react-horizontal-scrolling-menu';

export function HeaderBar() {

  
  const subreddits = useSelector(selectFavoriteSubreddits)
  const [selected, setSelected] = useState(subreddits[0])
  const menu = Menu(subreddits,selected)
  
  return (
    <div className='HeaderBar' >
      <div className='header'>
        <TitleHeader />
      </div>
      { console.log('ScrollMenu:')}
      { console.log(subreddits)}
      <ScrollMenu
          
          data={menu}
          arrowLeft={ArrowLeft}
          arrowRight={ArrowRight}
          selected={selected}
          onSelect={setSelected}
/>
      {/* <div id='gentags' className={styles.subreddit_scrollbar}>
        {
            subreddits.map(elm => <Subreddit name = {elm} />)
        }

      </div> */}
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