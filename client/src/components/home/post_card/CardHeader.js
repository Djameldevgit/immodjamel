import React, { useState } from 'react';
import Avatar from '../../Avatar';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { GLOBALTYPES } from '../../../redux/actions/globalTypes';
import { deletePost } from '../../../redux/actions/postAction';
import { aprovarPostPendiente } from '../../../redux/actions/postAproveAction';
import ReportPost from './ReportPost';
 
import { MESS_TYPES  } from '../../../redux/actions/messageAction'


const CardHeader = ({ post }) => {
    
    const { auth,socket,online, homeUsers: { users } } = useSelector(state => state);
  
    const [showReportModal, setShowReportModal] = useState(false);
    // Obtén el primer administrador disponible
    const admin = users.find(user => user.role === 'admin');

    const user = post.user; // Obtienes el usuario dueño del post
    const dispatch = useDispatch();
    const history = useHistory();

    // Función para agregar usuario
    const handleAddUser = (user) => {
        // Despacha las acciones de Redux
        dispatch({ type: MESS_TYPES.ADD_USER, payload: { ...user, text: '', media: [] } });
        dispatch({ type: MESS_TYPES.CHECK_ONLINE_OFFLINE, payload: online });

        // Redirige a la página de mensajes
        history.push(`/message/${user._id}`);
    };


   

    // Función para llamar al administrador
    const handleCallAdmin = (admin) => {
        if (!admin || !admin._id) {
            console.error('Administrador no válido:', admin);
            alert('No hay administradores disponibles');
            return;
        }

        // Verifica si el usuario autenticado está disponible
        if (!auth.user || !auth.user._id) {
            console.error('Usuario autenticado no válido:', auth.user);
            alert('Debes iniciar sesión para contactar al administrador');
            return;
        }

        // Lógica para llamar al administrador
        console.log('Llamando al administrador:', admin.name);

        // Redirigir a una página de chat con el administrador
        history.push(`/message/${admin._id}`);
    };

    // Si no hay administradores, muestra un mensaje
    if (!admin) {
        return (
            <div className="dropdown-item">
                <span className="material-icons">person_add</span> No hay administradores disponibles
            </div>
        );
    }


     

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
        <div className="cardheaderpost">

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
                    <span className="material-icons" data-toggle="dropdown"  >
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
                        <div className="dropdown-item"onClick={() => handleCallAdmin(admin)}>
                            <span className="material-icons">person_add</span> escribir al administrador
                        </div>

                        <div className="dropdown-item"onClick={() => handleAddUser(user)}>
                            <span className="material-icons">person_add</span> escribir al usuario
                        </div>
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