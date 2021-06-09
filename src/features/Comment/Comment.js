import React, { useState } from "react";
import styles from "../Comments/Comments.module.css";

export function Comment({ author, text, children, isPopUp }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleClick = (e) => {
        setIsExpanded(!isExpanded);
    }

    return (
        <div className={styles.comment}>
            <p style={{ color: "blue" }}>{author}</p>
            <p style={{ color: "black" }}>{text}</p>
            { isPopUp && children && isExpanded && (
                <div className={styles.sub} >
                    { children.data.children.map(child => {
                        return (
                            <div>
                                <div onClick={handleClick} >&#9960; Close Children</div>
                                <Comment author={child.data.author} text={child.data.body} children={child.data.replies} isPopUp={isPopUp} />
                            </div>
                        ) 
                    }) }
                </div>
            )}
            { isPopUp && children && !isExpanded && (
                <div className={styles.sub} >
                    <div onClick={handleClick} >&#9960; Load Children</div>
                </div>
            )}
        </div>
    )
}