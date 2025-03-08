import React from 'react'
import CardHeader from './home/post_card/CardHeader'
import CardBodyCarousel from './home/post_card/CardBodyCarousel'


import Comments from './home/Comments'
import InputComment from './home/InputComment'
import CardBodyTitle from './home/post_card/CardBodyTitle'
import CardFooterPost from './home/post_card/CardFooterPost'
import { useLocation } from "react-router-dom";
import DescriptionPost from './home/post_card/DescriptionPost'
 
  const PostCard = ({ post, theme }) => {
      const location = useLocation();
      const isPostDetailPage = location.pathname === `/post/${post._id}`;
  
      return (
          <div className="card my-3">
              <CardHeader post={post} />
              <CardBodyTitle post={post} />
              <CardBodyCarousel post={post} theme={theme} />
              <CardFooterPost post={post} />
        
              {isPostDetailPage && <DescriptionPost post={post} />}
              {isPostDetailPage && <Comments post={post} />}
              {isPostDetailPage && <InputComment post={post} />}
          </div>
      );
  };
  
  export default PostCard;
  
