import React from 'react';
import moment from 'moment';

const CardFooterPost = ({ post }) => {
    return (
        <div className="cardfooterpost">
            <small className="textmuted">
                {moment(post.createdAt).fromNow()}  
            </small>
            
        </div>
    );
};

export default CardFooterPost;