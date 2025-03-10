import React from 'react';
import moment from 'moment';

const CardFooterPost = ({ post }) => {
    return (
        <div className="cardfooterpost">
            <small className="textmuted">
            <span className="mr-1"><i className='far fa-clock'></i>  </span>
                {moment(post.createdAt).fromNow()}  
            </small>
            
        </div>
    );
};

export default CardFooterPost;