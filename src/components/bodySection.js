import React, { useEffect, useState } from 'react';
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
  const [lastScroll, setLastScroll] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  //Variables used to set up dislay
  const subredditPosts = useSelector(selectSubJsonPosts); // contains all posts urls
  const currentSubreddit = useSelector(selectCurrentSubredditName) //contains the key for which posts to view
  const isLoading = useSelector(isLoadingPosts); // so we know if we are just waiting for data
  const failedToLoad = useSelector(failedToLoadPosts); // so we know if thre is an error in data aqusistion
  const postdata = useSelector(selectPostsData); // contains all posts
  const numCols = useSelector(selectColumnNumber); //contians the layout format

  //Not needed but useful and possibly will be used in the future
  // const alreadyLoaded = useSelector(isAlreadyLoaded)
  // console.log(alreadyLoaded)
  // const postState = useSelector(selectState);
  // console.log(postState);

  

  const hideHeader = (e) => {
    const header = document.getElementById('HeaderBar_id');
    const body = document.querySelector('#bodySection_id');

    const scrollUpHeader = styles.scrollUpHeader;
    const scrollDownHeader = styles.scrollDownHeader;
    const scrollUpBody = styles.scrollUpBody;
    const scrollDownBody = styles.scrollDownBody;


    const currentScroll = body.scrollTop;
    
    
    if (currentScroll <= 0) {
      header.classList.remove(scrollUpHeader);
      body.classList.remove(scrollUpBody);
      return;
    }
  
    if (currentScroll > lastScroll ) {
      // down
      header.classList.remove(scrollUpHeader);
      header.classList.add(scrollDownHeader);
      body.classList.remove(scrollUpBody);
      body.classList.add(scrollDownBody);
    } else if (currentScroll < lastScroll ) {
      // up
      header.classList.remove(scrollDownHeader);
      header.classList.add(scrollUpHeader);
      body.classList.remove(scrollDownBody);
      body.classList.add(scrollUpBody);
  
    }
    setLastScroll(currentScroll);
  }

  //Gets the posts to be viewed
  useEffect(() => {
    dispatch(loadPosts({payload:subredditPosts, subredditName: currentSubreddit}));
  }, [dispatch, subredditPosts])

  useEffect(() => {
    const updateWindowDimensions = () => {

      const vh = Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0
      );
      console.log("vh:");
      console.log(vh);

      setWindowHeight(vh);
      
      console.log("updating height");
    };

    window.addEventListener("resize", updateWindowDimensions);
    updateWindowDimensions()

    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, []);

  //changes the diplay layout
  useEffect(() => {
    document.documentElement.style.setProperty("--numCol", numCols);
    const width = numCols === 1 ? '50%' : numCols === 2 ? '70%' : '80%'
    document.documentElement.style.setProperty("--maxWidthPercent", width);
  }, [numCols])

  if (isLoading)
    return <div className={styles.loader}></div>

  const gridInsides = !isLoading && !failedToLoad && postdata[currentSubreddit] && Object.values(postdata[currentSubreddit])?Array.apply(null, {length: numCols}):<p>Errror</p>
  
  if (Array.isArray(gridInsides)){
    for(let i = 0; i < numCols; i++){
      gridInsides[i] = (
        <div className={styles.gridItem} >
          {Object.values(postdata[currentSubreddit]).map((elm, index) => (
            index%numCols===i&&<Posts key={elm.id} elm={elm} windowHeight={windowHeight}/>
          ))}
        </div>
      )
    }
  }
  
  return (
    <div id='bodySection_id' className={styles.bodySection} onScroll={hideHeader}>
      <div className={styles.gridContainer} >
      {gridInsides}
      </div>
    </div>
  );
}



