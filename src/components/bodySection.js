import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Posts } from '../features/Posts/Posts'
import styles from './bodyStyles.module.css';
import { 
  loadPosts, 
  isLoadingPosts, 
  failedToLoadPosts, 
  selectPostsData, 
  selectState,
  isAlreadyLoaded
} from '../features/Posts/postSlice';
import { selectSubJsonPosts, selectCurrentSubredditName } from '../features/Subreddit/subredditSlice';
import { selectColumnNumber } from '../features/TitleHeader/titleHeaderSlice';

export function BodySection() {
  const dispatch = useDispatch();
  const subredditPosts = useSelector(selectSubJsonPosts);
  const currentSubreddit = useSelector(selectCurrentSubredditName)

  const isLoading = useSelector(isLoadingPosts);
  const failedToLoad = useSelector(failedToLoadPosts);
  const postdata = useSelector(selectPostsData);
  const alreadyLoaded = useSelector(isAlreadyLoaded)
  console.log(alreadyLoaded)

  const numCols = useSelector(selectColumnNumber);

  const postState = useSelector(selectState);
  console.log(postState);

  useEffect(() => {
    dispatch(loadPosts({payload:subredditPosts, subredditName: currentSubreddit}));
  }, [dispatch, subredditPosts])

  useEffect(() => {
    document.documentElement.style.setProperty("--numCol", numCols);
    const width = numCols === 1 ? '50%' : numCols === 2 ? '70%' : '80%'
    document.documentElement.style.setProperty("--maxWidthPercent", width);
  }, [numCols])
  
  return (
    <div className={styles.bodySection} >
      <div className={styles.gridContainer} >
      {!isLoading && !failedToLoad && postdata[currentSubreddit] && Object.values(postdata[currentSubreddit]).map(elm => (
        
        <div className={styles.gridItem} >
          <Posts key={elm.id} elm={elm}/>
        </div>
      ))}
      </div>
    </div>
  );
}
