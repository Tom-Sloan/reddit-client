import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Posts } from '../features/Posts/Posts'
import styles from './bodyStyles.module.css';
import { 
  loadPosts, 
  isLoadingPosts, 
  failedToLoadPosts, 
  selectPostsData, 
  selectState} from '../features/Posts/postSlice';
import { selectSubJsonPosts } from '../features/Subreddit/subredditSlice';

export function BodySection() {
  const dispatch = useDispatch();
  const subredditPosts = useSelector(selectSubJsonPosts);

  const isLoading = useSelector(isLoadingPosts);
  const failedToLoad = useSelector(failedToLoadPosts);
  const postdata = useSelector(selectPostsData);
  const postState = useSelector(selectState);

  console.log(postState);

  useEffect(() => {
    dispatch(loadPosts(subredditPosts));
  }, [dispatch, subredditPosts])
  
  return (
    <div>
      <div className={styles.gridContainer} >
      {!isLoading && !failedToLoad && Object.values(postdata.posts).map(elm => (
        <div className={styles.gridItem} >
          <Posts elm={elm}/>
        </div>
      ))}
      </div>
    </div>
  );
}
