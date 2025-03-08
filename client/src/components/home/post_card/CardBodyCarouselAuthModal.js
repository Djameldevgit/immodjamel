 

const CardBodyCarouselAuthModal = ({ showModal, closeModal, redirectToLogin, redirectToRegister }) => {
    if (!showModal) return null;
  return (
    <div className="auth-modal-overlay" onClick={closeModal}>
            <div className="auth-modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Por favor, inicie sesión o regístrese</h2>
                <button onClick={redirectToLogin}>Iniciar sesión</button>
                <button onClick={redirectToRegister}>Registrarse</button>
                <button onClick={closeModal}>Cerrar</button>
            </div>
        </div>
  )
}

export default CardBodyCarouselAuthModal
