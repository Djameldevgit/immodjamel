import React, { useState } from 'react';
import Avatar from '../../Avatar';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { GLOBALTYPES } from '../../../redux/actions/globalTypes';
import { deletePost } from '../../../redux/actions/postAction';
import { aprovarPostPendiente } from '../../../redux/actions/postAproveAction';
 
import { MESS_TYPES } from '../../../redux/actions/messageAction'
import Cardheadermodalreportpost from './Cardheadermodalreportpost';


const CardHeader = ({ post }) => {

    const { auth, socket, online, homeUsers: { users } } = useSelector(state => state);

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
                    <span className="material-icons dropdown-toggle" data-toggle="dropdown">
                        more_horiz
                    </span>

                    <div className="dropdown-menu">
                        {auth.user.role === "admin" && (
                            <>
                                <DropdownItem icon="check_circle" text="Approuver le post" onClick={handleAprove} />
                                <DropdownItem icon="create" text="Modifier le post" onClick={handleEditPost} />
                                <DropdownItem icon="delete_outline" text="Supprimer le post" onClick={handleDeletePost} />
                            </>
                        )}

                        {auth.user._id === post.user._id && (
                            <>
                                <DropdownItem icon="create" text="Modifier le post" onClick={handleEditPost} />
                                <DropdownItem icon="delete_outline" text="Supprimer le post" onClick={handleDeletePost} />
                            </>
                        )}

                        <DropdownItem icon="person_add" text="Écrire à l'administrateur" onClick={() => handleCallAdmin(admin)} />
                        <DropdownItem icon="person_add" text="Écrire à l'auteur du post" onClick={() => handleAddUser(user)} />
                        <DropdownItem icon="person_add" text="Suivre l'auteur" />
                        <DropdownItem icon="report" text="Signaler le post" onClick={() => setShowReportModal(true)} />
                        <DropdownItem icon="bookmark" text="Sauvegarder le post" />
                    </div>
                </div>
            )}

            {showReportModal && (
                <div className="modal-overlay">
                    <Cardheadermodalreportpost
                        post={post}
                        auth={auth}
                        onClose={() => setShowReportModal(false)}
                        onReport={handleReportPost}
                    />
                </div>
            )}
        </div>
    );
};

const DropdownItem = ({ icon, text, onClick }) => (
    <div className="dropdown-item" onClick={onClick}>
        <span className="material-icons">{icon}</span>
        <span>{text}</span>
    </div>
);

export default CardHeader;