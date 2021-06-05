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
import styles from '../counter/Counter.module.css';
import { loadSubredditData, selectSubJsonPosts } from '../Subreddit/subredditSlice';
import { 
  loadPosts, 
  isLoadingPosts, 
  failedToLoadPosts, 
  selectPostsData, 
  selectAllPosts, 
  selectState} from '../Posts/postSlice';


export function Posts() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');
  const incrementValue = Number(incrementAmount) || 0;
  
  //get required data
  const subredditPosts = useSelector(selectSubJsonPosts);

  //get status of new data aquisition 
  // dispatch(createNewPost({data: unloadedData}))
 
  const isLoading = useSelector(isLoadingPosts);
  const failedToLoad = useSelector(failedToLoadPosts);
  const postdata = useSelector(selectPostsData);
  const postState = useSelector(selectState);
  
  console.log('Counter postdata:')
  console.log(postdata);
  console.log(useSelector(selectAllPosts));
  console.log(isLoading);
  console.log(postState);

  useEffect(() => {
    dispatch(loadPosts(subredditPosts));
  }, [dispatch, subredditPosts])
  
  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => {
            
            dispatch(increment())
          }}
        >
          +
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() => dispatch(incrementByAmount(incrementValue))}
        >
          Add Amount
        </button>
        <button
          className={styles.asyncButton}
          onClick={() => dispatch(incrementAsync(incrementValue))}
        >
          Add Async
        </button>
        <button
          className={styles.button}
          onClick={() => dispatch(incrementIfOdd(incrementValue))}
        >
          Add If Odd
        </button>
      </div>
      <div className = {styles.row}>
          {!isLoading && !failedToLoad && Object.values(postdata.posts).map(elm => (
            <div key={elm.title}>
              <img src={elm.img} alt={elm.title} />
              <hr/>
            </div>
          ))}
      </div>
    </div>
  );
}
