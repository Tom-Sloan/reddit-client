import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Posts } from "../features/Posts/Posts";
import styles from "./bodyStyles.module.css";

import {
  loadPosts,
  isLoadingPosts,
  failedToLoadPosts,
  selectPostsData,
  selectState,
  isAlreadyLoaded,
} from "../features/Posts/postSlice";
import {
  selectSubJsonPosts,
  selectCurrentSubredditName,
  selectPostDisplayLimit,
  updatePostDisplayLimit,
  loadSubredditData,
  failedToLoadSubreddit,
  isLoadingSubreddit,
} from "../features/Subreddit/subredditSlice";
import { selectColumnNumber } from "../features/TitleHeader/titleHeaderSlice";
import { Footer } from "./footer";

export function BodySection() {
  const dispatch = useDispatch();
  const [lastScroll, setLastScroll] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);


  //Variables used to set up dislay
  const subredditPosts = useSelector(selectSubJsonPosts); // contains all posts urls
  const currentSubreddit = useSelector(selectCurrentSubredditName); //contains the key for which posts to view
  const isLoading = useSelector(isLoadingPosts); // so we know if we are just waiting for data
  const isLoadingSub = useSelector(isLoadingSubreddit);
  const failedToLoadSub = useSelector(failedToLoadSubreddit);
  const failedToLoad = useSelector(failedToLoadPosts); // so we know if thre is an error in data aqusistion
  const postdata = useSelector(selectPostsData); // contains all posts
  const numCols = useSelector(selectColumnNumber); //contians the layout format
  const postDisplayLimit = useSelector(selectPostDisplayLimit);

  //Not needed but useful and possibly will be used in the future
  // const alreadyLoaded = useSelector(isAlreadyLoaded)
  // console.log(alreadyLoaded)
  // const postState = useSelector(selectState);
  // console.log(postState);

  const hideHeader = (e) => {
    const header = document.getElementById("HeaderBar_id");
    const body = document.querySelector("#bodySection_id");
    const LoadingFooter = document.querySelector("#LoadingFooter");

    const scrollUp = styles.scrollUp;
    const scrollDown = styles.scrollDown;
    const animation = styles.animation;

    const currentScroll = body.scrollTop;
    document.documentElement.style.setProperty("--popUpHieght", currentScroll);
    
    if (currentScroll <= 0) {
      header.classList.remove(scrollUp);
      body.classList.remove(scrollUp);
      return;
    }

    if (
      currentScroll >=
      body.scrollHeight -
        body.clientHeight -
        header.clientHeight -
        LoadingFooter.clientHeight
    ) {
      header.classList.add(scrollDown);
      body.classList.add(scrollDown);
      LoadingFooter.style.display = "block";
      const limit =
        postDisplayLimit === 25 ? 50 : postDisplayLimit === 50 ? 75 : 100;
      console.log(limit);
      dispatch(updatePostDisplayLimit(limit));
      return;
    }
    header.classList.add(animation);
    body.classList.add(animation);
    LoadingFooter.style.display = "none";
    if (currentScroll > lastScroll) {
      // down
      console.log("down");
      header.classList.remove(scrollUp);
      header.classList.add(scrollDown);
      body.classList.remove(scrollUp);
      body.classList.add(scrollDown);
    } else if (currentScroll < lastScroll) {
      // up
      header.classList.remove(scrollDown);
      header.classList.add(scrollUp);
      body.classList.remove(scrollDown);
      body.classList.add(scrollUp);
    }

    setLastScroll(currentScroll);
  };

  //Gets the posts to be viewed
  useEffect(() => {
    dispatch(
      loadPosts({ payload: subredditPosts, subredditName: currentSubreddit })
    );
  }, [dispatch, subredditPosts]);

  useEffect(() => {
    const updateWindowDimensions = () => {
      const vh = Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0
      );

      setWindowHeight(vh);
    };

    window.addEventListener("resize", updateWindowDimensions);
    updateWindowDimensions();

    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, []);

  //changes the diplay layout
  useEffect(() => {
    document.documentElement.style.setProperty("--numCol", numCols);
    const width = numCols === 1 ? "50%" : numCols === 2 ? "70%" : "80%";
    document.documentElement.style.setProperty("--maxWidthPercent", width);
  }, [numCols]);

  if (isLoading || isLoadingSub) return <div className={styles.loader}></div>;

  let gridInsides;

  if (
    !isLoadingSub &&
    !failedToLoadSub &&
    !isLoading &&
    !failedToLoad &&
    postdata[currentSubreddit] &&
    Object.values(postdata[currentSubreddit])
  ) {
    gridInsides = Array.apply(null, { length: numCols });
  } else if (!failedToLoad && !failedToLoadSub) {
    dispatch(loadSubredditData({ subreddit: "EarthPorn" }));
    gridInsides = <p></p>;
  }

  if (Array.isArray(gridInsides)) {
    for (let i = 0; i < numCols; i++) {
      gridInsides[i] = (
        <div className={styles.gridItem}>
          {Object.values(postdata[currentSubreddit]).map((elm, index) => {
            if (index > postDisplayLimit) return null;
            return (
              index % numCols === i && (
                <Posts key={elm.id} elm={elm} windowHeight={windowHeight} />
              )
            );
          })}
        </div>
      );
    }
  }

  return (
    <div
      id="bodySection_id"
      className={`${styles.bodySection} ${styles.animation}`}
      onScroll={hideHeader}
    >
      <div className={styles.gridContainer}>{gridInsides}</div>
      <Footer />
    </div>
  );
}
