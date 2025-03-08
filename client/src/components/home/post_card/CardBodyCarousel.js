import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import LikeButton from '../../LikeButton';
import { useSelector, useDispatch } from 'react-redux';
import { likePost, unLikePost, savePost, unSavePost } from '../../../redux/actions/postAction';
import Carousel from '../../Carousel';

const CardBodyCarousel = ({ post }) => {
    const history = useHistory();
    const [isLike, setIsLike] = useState(false);
    const [loadLike, setLoadLike] = useState(false);
    const { auth, socket } = useSelector(state => state);
    const dispatch = useDispatch();
    const [saved, setSaved] = useState(false);
    const [saveLoad, setSaveLoad] = useState(false);

    // Likes
    useEffect(() => {
        if (post.likes.find(like => like._id === auth.user._id)) {
            setIsLike(true);
        } else {
            setIsLike(false);
        }
    }, [post.likes, auth.user._id]);

    const handleLike = async (e) => {
        e.stopPropagation(); // Evita la propagación del evento
        if (loadLike) return;
        setLoadLike(true);
        await dispatch(likePost({ post, auth, socket }));
        setLoadLike(false);
    };

    const handleUnLike = async (e) => {
        e.stopPropagation(); // Evita la propagación del evento
        if (loadLike) return;
        setLoadLike(true);
        await dispatch(unLikePost({ post, auth, socket }));
        setLoadLike(false);
    };

    // Saved
    useEffect(() => {
        if (auth.user.saved.find(id => id === post._id)) {
            setSaved(true);
        } else {
            setSaved(false);
        }
    }, [auth.user.saved, post._id]);

    const handleSavePost = async (e) => {
        e.stopPropagation(); // Evita la propagación del evento
        if (saveLoad) return;
        setSaveLoad(true);
        await dispatch(savePost({ post, auth }));
        setSaveLoad(false);
    };

    const handleUnSavePost = async (e) => {
        e.stopPropagation(); // Evita la propagación del evento
        if (saveLoad) return;
        setSaveLoad(true);
        await dispatch(unSavePost({ post, auth }));
        setSaveLoad(false);
    };

    return (
        <div className="cardbodycarousel">
           <div onClick={() => history.push(`/post/${post._id}`)}>
                            <Carousel images={post.images} id={post._id} />
                        </div>
            <div className="card_icon_overlay">
                <div className="icon_left">
                    <LikeButton
                        isLike={isLike}
                        handleLike={handleLike}
                        handleUnLike={handleUnLike}
                    />
                </div>
                <div className="icon_right">
                    {saved
                        ? <i className="fas fa-bookmark text-info" onClick={handleUnSavePost} />
                        : <i className="far fa-bookmark" onClick={handleSavePost} />
                    }
                </div>
            </div>
        </div>
    );
};

export default CardBodyCarousel;