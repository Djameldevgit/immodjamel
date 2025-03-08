import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const DescriptionPost = ({ post }) => {
    const { languageReducer } = useSelector(state => state);
    const { t } = useTranslation();

    const language = languageReducer.language || "en";

    return (
        <div className="product-details">
            <div className="details-container">
                <div className="info-item">
                    <i className="fas fa-home"></i>
                    <span className="info-label">Immobilier:</span>
                    <span className="info-value">{post.subCategory}</span>
                </div>

                <div className="info-item">
                    <i className="fas fa-building"></i>
                    <span className="info-label">Type:</span>
                    <span className="info-value">
                        {post.title}
                        {(String(post.title).trim().toLowerCase() === "villa" || String(post.title).trim().toLowerCase() === "appartement") && " F"}
                        {post.attributes.piece}
                    </span>
                </div>

                <div className="info-item">
                    <i className="fas fa-calendar-alt"></i>
                    <span className="info-label">Publié le:</span>
                    <span className="info-value">
                        {new Date(post.createdAt).toLocaleDateString()} à {new Date(post.createdAt).toLocaleTimeString()}
                    </span>
                </div>

                <div className="info-item">
                    <i className="fas fa-sync-alt"></i>
                    <span className="info-label">Actualise le:</span>
                    <span className="info-value">
                        {new Date(post.updatedAt).toLocaleDateString()} à {new Date(post.updatedAt).toLocaleTimeString()}
                    </span>
                </div>

                <div className="info-item">
                    <i className="fas fa-eye"></i>
                    <span className="info-label">Vue:</span>
                    <span className="info-value">{post.vistas || 0}</span>
                </div>

                <div className="info-item">
                    <i className="fas fa-thumbs-up"></i>
                    <span className="info-label">Likes:</span>
                    <span className="info-value">{(post.likes || []).length}</span>
                </div>

                <div className="info-item">
                    <i className="fas fa-comments"></i>
                    <span className="info-label">Commentaires:</span>
                    <span className="info-value">{(post.comments || []).length}</span>
                </div>

                <div className="info-item">
                    <i className="fas fa-comments"></i>
                    <span className="info-label">{t("allowComments", { lng: language })}:</span>
                    <span className="info-value">{post.comentarios || t("notSpecified", { lng: language })}</span>
                </div>

                <div className="info-item">
                    <i className="fas fa-ruler"></i>
                    <span className="info-label">Superficie:</span>
                    <span className="info-value">{post.attributes.superficie || 'N/A'} M²</span>
                </div>

                <div className="info-item">
                    <i className="fas fa-building"></i>
                    <span className="info-label">Etage(s):</span>
                    <span className="info-value">{post.attributes.etage || 'N/A'}</span>
                </div>

                <div className="info-item">
                    <i className="fas fa-cogs"></i>
                    <span className="info-label">Pièces:</span>
                    <span className="info-value">{post.attributes.piece || 'N/A'}</span>
                </div>

                <div className="info-item">
                    <i className="fas fa-user-tie"></i>
                    <span className="info-label">Promotion immobilière:</span>
                    <span className="info-value">{post.attributes.promoteurimmobilier || 'N/A'}</span>
                </div>

                <div className="info-item">
                    <i className="fas fa-user"></i>
                    <span className="info-label">Parle du promoteur immobilier:</span>
                    <span className="info-value">{post.attributes.parlepromoteurimmobilier || 'N/A'}</span>
                </div>

                <div className="info-item">
                    <i className="fas fa-credit-card"></i>
                    <span className="info-label">Conditions de paiement:</span>
                    <span className="info-value">
                        {(post.attributes.conditiondepeyement || []).length > 0
                            ? post.attributes.conditiondepeyement.join(", ")
                            : "N/A"}
                    </span>
                </div>

                <div className="info-item">
                    <i className="fas fa-list-ul"></i>
                    <span className="info-label">Spécifications:</span>
                    <span className="info-value">
                        {(post.attributes.specifications || []).length > 0
                            ? post.attributes.specifications.join(", ")
                            : "N/A"}
                    </span>
                </div>

                <div className="info-item">
                    <i className="fas fa-file-alt"></i>
                    <span className="info-label">Papiers:</span>
                    <span className="info-value">
                        {(post.attributes.papiers || []).length > 0
                            ? post.attributes.papiers.join(", ")
                            : "N/A"}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default DescriptionPost;
