import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../../components/bodyStyles.module.css';
import { selectComments } from './commentsSlice';

export function Comments({postId}) {
    const allComments = useSelector(selectComments);
    console.log('comments');
    console.log(allComments);

    let element;

    if(allComments.comments[postId].length > 0) {
        element = allComments.comments[postId].map(comment => (<div className={styles.comment}><p>{comment}</p><hr/></div>));
    } else {
        element = <div>No Comments</div>;
    }

    console.log(element)

    return (
        <div className={styles.comments}>
            {element}
        </div>
    )
}