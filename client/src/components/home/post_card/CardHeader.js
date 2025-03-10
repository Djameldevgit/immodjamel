import React, { useState } from 'react';
import Avatar from '../../Avatar';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { GLOBALTYPES } from '../../../redux/actions/globalTypes';
import { deletePost } from '../../../redux/actions/postAction';
import { aprovarPostPendiente } from '../../../redux/actions/postAproveAction';
import ReportPost from './ReportPost';


const CardHeader = ({ post }) => {
    const { auth, socket } = useSelector(state => state);
    const dispatch = useDispatch();
    const history = useHistory();

    // Estado para controlar la visibilidad del modal de reporte
    const [showReportModal, setShowReportModal] = useState(false);

    const handleAprove = () => {
        const confirmAction = window.confirm("¿Vous voulez aprouve ce post?");
        if (confirmAction) {
            dispatch(aprovarPostPendiente(post, 'aprovado', auth));
            return history.push("#");
        }
    };

    const handleEditPost = () => {
        dispatch({ type: GLOBALTYPES.STATUS, payload: { ...post, onEdit: true } });
    };

    const handleDeletePost = () => {
        if (window.confirm("Are you sure want to delete this post?")) {
            dispatch(deletePost({ post, auth, socket }));
            return history.push("/");
        }
    };

    // Función para manejar el reporte del post
    const handleReportPost = async (reportData) => {
        try {
            // Aquí puedes enviar la solicitud al backend para guardar el reporte
            console.log("Reporte enviado:", reportData);
            alert("Post reportado correctamente.");
        } catch (error) {
            console.error("Error al reportar el post:", error);
            alert("Error al reportar el post.");
        }
    };

    return (
        <div className="card_header">
            {/* Verifica si auth.user existe antes de acceder a role */}
            {auth.user?.role === "superuser" && (
                <div className="d-flex">
                    <Avatar src={post.user.avatar} size="big-avatar" />
                    <div className="card_name">
                        <h6 className="m-0">
                            <Link to={`/profile/${post.user._id}`} className="text-dark">
                                {post.user.username}
                            </Link>
                        </h6>
                        <small className="text-muted">
                            {moment(post.createdAt).fromNow()}
                        </small>
                    </div>
                </div>
            )}

            {auth.user && (
                <div className="nav-item dropdown">
                    <span className="material-icons" data-toggle="dropdown" style={{ display: "flex", marginRight: 0 }}>
                        more_horiz
                    </span>

                    <div className="dropdown-menu">
                        <>
                            {auth.user.role === "admin" && (
                                <>
                                    <div className="dropdown-item" onClick={handleAprove}>
                                        <span className="material-icons">check_circle</span> Approve Post
                                    </div>
                                    <div className="dropdown-item" onClick={handleEditPost}>
                                        <span className="material-icons">create</span> Edit Post
                                    </div>
                                    <div className="dropdown-item" onClick={handleDeletePost}>
                                        <span className="material-icons">delete_outline</span> Remove Post
                                    </div>
                                </>
                            )}

                            {auth.user._id === post.user._id && (
                                <>
                                    <div className="dropdown-item" onClick={handleEditPost}>
                                        <span className="material-icons">create</span> Edit Post
                                    </div>
                                    <div className="dropdown-item" onClick={handleDeletePost}>
                                        <span className="material-icons">delete_outline</span> Remove Post
                                    </div>
                                </>
                            )}
                        </>

                        <div className="dropdown-item">
                            <span className="material-icons">person_add</span> Seguir al autor
                        </div>
                        <div className="dropdown-item" onClick={() => setShowReportModal(true)}>
                            <span className="material-icons">report</span> Reportar post
                        </div>
                        <div className="dropdown-item">
                            <span className="material-icons">bookmark</span> Guardar post
                        </div>
                    </div>
                </div>
            )}

{showReportModal && (
    <ReportPost
        post={post}
        auth={auth}
        onClose={() => setShowReportModal(false)}
        onReport={handleReportPost}
    />
)}
        </div>
    );
};

export default CardHeader;