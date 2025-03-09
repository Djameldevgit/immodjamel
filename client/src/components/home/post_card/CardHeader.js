import React from 'react'
import Avatar from '../../Avatar'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import { GLOBALTYPES } from '../../../redux/actions/globalTypes'
import { deletePost } from '../../../redux/actions/postAction'
import { BASE_URL } from '../../../utils/config'
import { aprovarPostPendiente } from '../../../redux/actions/postAproveAction'

const CardHeader = ({ post }) => {
    const { auth, socket } = useSelector(state => state)
    const dispatch = useDispatch()

    const history = useHistory()

    const handleAprove = () => {
        
        const confirmAction = window.confirm("¿Vous voulez aprouve ce post?")
        if (confirmAction) {
            dispatch(aprovarPostPendiente(post, 'aprovado', auth));
            return history.push("#");
        }
    };

    const handleEditPost = () => {
        dispatch({ type: GLOBALTYPES.STATUS, payload: { ...post, onEdit: true } })
    }

    const handleDeletePost = () => {
        if (window.confirm("Are you sure want to delete this post?")) {
            dispatch(deletePost({ post, auth, socket }))
            return history.push("/")
        }
    }

    const handleCopyLink = () => {
        navigator.clipboard.writeText(`${BASE_URL}/post/${post._id}`)
    }

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
    
        {/* Ocultar el dropdown si el usuario no está autenticado */}
        {auth.user && (
            <div className="nav-item dropdown">
                <span className="material-icons" id="moreLink" data-toggle="dropdown">
                    more_horiz
                </span>
    
                <div className="dropdown-menu">
                    {/* Botón para copiar enlace (visible para todos) */}
                    <div className="dropdown-item" onClick={handleCopyLink}>
                        <span className="material-icons">content_copy</span> Copy Link
                    </div>
    
                    {/* Acciones para usuarios autenticados */}
                    <>
                        {/* Si el usuario es el propietario del post */}
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
    
                        {/* Si el usuario es admin */}
                        {auth.user.role === "admin" && (
                            <>
                                <div className="dropdown-item" onClick={handleEditPost}>
                                    <span className="material-icons">create</span> Edit Post
                                </div>
                                <div className="dropdown-item" onClick={handleDeletePost}>
                                    <span className="material-icons">delete_outline</span> Remove Post
                                </div>
                                <div className="dropdown-item" onClick={handleAprove}>
                                    <span className="material-icons">check_circle</span> Approve Post
                                </div>
                            </>
                        )}
                    </>
                </div>
            </div>
        )}
    </div>
    

    )
}

export default CardHeader
