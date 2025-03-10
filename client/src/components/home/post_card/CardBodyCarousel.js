import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import LikeButton from '../../LikeButton';
import { useSelector, useDispatch } from 'react-redux';
import { likePost, unLikePost, savePost, unSavePost } from '../../../redux/actions/postAction';
import Carousel from '../../Carousel';
import AuthModal from './CardBodyCarouselAuthModal';
import CardFooterPost from './CardFooterPost'; // Importa el componente

const CardBodyCarousel = ({ post }) => {
    const history = useHistory();
    const [isLike, setIsLike] = useState(false);
    const [loadLike, setLoadLike] = useState(false);
    const { auth, socket } = useSelector(state => state);
    const dispatch = useDispatch();
    const [saved, setSaved] = useState(false);
    const [saveLoad, setSaveLoad] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);

    // Likes
    useEffect(() => {
        if (post.likes.find(like => like._id === auth.user?._id)) {
            setIsLike(true);
        } else {
            setIsLike(false);
        }
    }, [post.likes, auth.user?._id]);

    const handleLike = async (e) => {
        e.stopPropagation();
        if (!auth.user) {
            setShowAuthModal(true);
            return;
        }
        if (loadLike) return;
        setLoadLike(true);
        await dispatch(likePost({ post, auth, socket }));
        setLoadLike(false);
    };

    const handleUnLike = async (e) => {
        e.stopPropagation();
        if (!auth.user) {
            setShowAuthModal(true);
            return;
        }
        if (loadLike) return;
        setLoadLike(true);
        await dispatch(unLikePost({ post, auth, socket }));
        setLoadLike(false);
    };

    // Saved
    useEffect(() => {
        if (auth.user?.saved.find(id => id === post._id)) {
            setSaved(true);
        } else {
            setSaved(false);
        }
    }, [auth.user?.saved, post._id]);

    const handleSavePost = async (e) => {
        e.stopPropagation();
        if (!auth.user) {
            setShowAuthModal(true);
            return;
        }
        if (saveLoad) return;
        setSaveLoad(true);
        await dispatch(savePost({ post, auth }));
        setSaveLoad(false);
    };

    const handleUnSavePost = async (e) => {
        e.stopPropagation();
        if (!auth.user) {
            setShowAuthModal(true);
            return;
        }
        if (saveLoad) return;
        setSaveLoad(true);
        await dispatch(unSavePost({ post, auth }));
        setSaveLoad(false);
    };

    const redirectToLogin = () => {
        history.push('/login');
        setShowAuthModal(false);
    };

    const redirectToRegister = () => {
        history.push('/register');
        setShowAuthModal(false);
    };

    const closeModal = () => setShowAuthModal(false);

    return (
        <>
        <div className="cardbodycarousel">
            <div onClick={() => history.push(`/post/${post._id}`)}>
                <Carousel images={post.images} id={post._id} />
            </div>

            <div className="card_icon_overlay">
                <div className="icon_right">
                    <div className="icon_container">
                        <LikeButton
                            isLike={isLike}
                            handleLike={handleLike}
                            handleUnLike={handleUnLike}
                        />
                        <span className="icon_count">{post.likes.length}</span>
                    </div>
                    <div className="icon_container">
                        <i className="far fa-comment" />
                        <span className="icon_count">{post.comments.length}</span>
                    </div>
                    <div className="icon_container">
                        <i className="fas fa-share" />
                        <span className="icon_count">{post.shares || 0}</span>
                    </div>
                    <div className="icon_container">
                        {saved
                            ? <i className="fas fa-bookmark text-info" onClick={handleUnSavePost} />
                            : <i className="far fa-bookmark" onClick={handleSavePost} />
                        }
                        <span className="icon_count">{post.saves || 0}</span>
                    </div>
                </div>
            </div>

            {/* Agrega el componente CardFooterPost aquí */}
            <CardFooterPost post={post} />
        </div>

        {/* Mueve el AuthModal fuera del contenedor del post */}
        <AuthModal
            showModal={showAuthModal}
            closeModal={closeModal}
            redirectToLogin={redirectToLogin}
            redirectToRegister={redirectToRegister}
        />
    </>
    );
};

export default CardBodyCarousel;