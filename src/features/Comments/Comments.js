import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../../components/bodyStyles.module.css';
import { selectComments } from './commentsSlice';
import {selectCurrentSubredditName} from '../Subreddit/subredditSlice'

export function Comments({postId}) {
    const allComments = useSelector(selectComments);

    let element;
    console.log('allcomments')
    console.log(allComments)
    if( allComments[postId].length > 0) {
        element = allComments[postId].map(comment => (<div className={styles.comment}><p>{comment}</p><hr/></div>));
    } else {
        element = <div>No Comments</div>;
    }

    // console.log(element)

    return (
        <div key= {'comment_'+postId} className={styles.comments}>
            {element}
        </div>
    )
}