import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Comments.module.css';
import { selectComments } from './commentsSlice';

export function Comments({postId}) {
    const [innerHeight, setHeight] = useState(0);
    const allComments = useSelector(selectComments);

    let element;
    // console.log('allcomments')
    // console.log(allComments)
    if( allComments[postId].length > 0) {
        element = allComments[postId].map((comment, index) => (
        <div id={'comment_'+postId+'-'+index} className={styles.comment}>
            <p>{comment}</p>
            <hr/>
        </div>));
        
    } else {
        element = <div>No Comments</div>;
    }

    useEffect(()=>{
        let height = 0;
        let limit = allComments[postId].length > 4? 5 :  allComments[postId].length
        for( let i = 0; i < limit; i++){
            console.log('height')
            console.log(document.getElementById('comment_'+postId+'-'+i).clientHeight)
            height += document.getElementById('comment_'+postId+'-'+i).clientHeight;
        }
        setHeight(height)
    }, [])
    // console.log(element)

    return (
        <div style={{height: innerHeight + 40}} key= {'comment_'+postId} className={styles.comments}>
            {element}
        </div>
    )
}