import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
  selectCount,
} from '../counter/counterSlice';
import styles from '../../components/bodyStyles.module.css';
import { loadSubredditData, selectSubJsonPosts } from '../Subreddit/subredditSlice';
import { 
  loadPosts, 
  isLoadingPosts, 
  failedToLoadPosts, 
  selectPostsData, 
  selectAllPosts, 
  selectState} from '../Posts/postSlice';
import { Comments } from '../Comments/Comments';

export function Posts({elm}) {
  // const count = useSelector(selectCount);
  // const dispatch = useDispatch();
  // const [incrementAmount, setIncrementAmount] = useState('2');
  // const incrementValue = Number(incrementAmount) || 0;
  
  // //get required data
  // const subredditPosts = useSelector(selectSubJsonPosts);

  // //get status of new data aquisition 
  // // dispatch(createNewPost({data: unloadedData}))
 
  // const isLoading = useSelector(isLoadingPosts);
  // const failedToLoad = useSelector(failedToLoadPosts);
  // const postdata = useSelector(selectPostsData);
  // const postState = useSelector(selectState);
  
  // console.log('Counter postdata:')
  // console.log(postdata);
  // console.log(useSelector(selectAllPosts));
  // console.log(isLoading);
  // console.log(postState);

  // useEffect(() => {
  //   dispatch(loadPosts(subredditPosts));
  // }, [dispatch, subredditPosts])

  let element;

  if (elm.is_video) {
    // element = <embed type="video/webm" className={styles.gridImg} src={elm.img} />;
    element = (
      <video className={styles.gridImg} controls={true} autoPlay={true} muted={true} loop={true} playsInline={true} >
        <source src={elm.media.reddit_video.fallback_url} type="video/mp4"  />
        Unsupported
      </video>
    )
    // element = <img src={elm.thumbnail} className={styles.gridImg} alt={elm.title} />;
  } else if (!elm.is_media) {
    element = <img src="https://i.redd.it/c0kjct56ayc21.jpg" className={styles.gridImg} alt={elm.title} />;
  } else {
    element = <img src={elm.img} className={styles.gridImg} alt={elm.title} />;
  }

  console.log(elm);
  
  return (
    <div className = {styles.row} elm={elm} >
      {element}
      <hr/>
      <p className={styles.title} ><strong>{elm.title}</strong></p>
      <hr/>
      <Comments postId={elm.id} />

    </div>
  );
}
