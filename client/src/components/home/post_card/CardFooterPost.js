import React from 'react';
import moment from 'moment';

const CardFooterPost = ({ post }) => {
    return (
        <div className="cardfooterpost">
            <small className="textmuted">
                {moment(post.createdAt).fromNow()} {/* Tiempo de publicación */}
            </small>
            <h5>
                {post.comments.length} comments {/* Número de comentarios */}
            </h5>
        </div>
    );
};

export default CardFooterPost;