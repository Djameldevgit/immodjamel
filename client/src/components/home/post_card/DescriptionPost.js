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
                    <span className="info-label">IMMOBILIER:</span>
                    <span className="info-value">&nbsp; {post.subCategory}</span>
                    <span className="info-value">{post.title}</span>
                </div>



                <div className="info-item">
                    <i className="fas fa-building"></i>
                    <span className="info-label">Titre:</span>
                    <span className="info-value">
                        &nbsp;  {post.title}
                        {(String(post.title).trim().toLowerCase() === "villa" || String(post.title).trim().toLowerCase() === "appartement")  && " F"}
                         {post.attributes.piece}
                    </span>
                </div>

                <div className="info-item">
                    <i className="fas fa-calendar-alt"></i>
                    <span className="info-label">Publié le:</span>
                    <span className="info-value">
                        &nbsp;   {new Date(post.createdAt).toLocaleDateString()} à {new Date(post.createdAt).toLocaleTimeString()}
                    </span>
                </div>

                <div className="info-item">
                    <i className="fas fa-sync-alt"></i>
                    <span className="info-label">Actualise le:</span>
                    <span className="info-value">
                        &nbsp;  {new Date(post.updatedAt).toLocaleDateString()} à {new Date(post.updatedAt).toLocaleTimeString()}
                    </span>
                </div>

                {(post.vistas || []).length > 0 && (
                    <div className="info-item">
                        <i className="fas fa-eye"></i>
                        <span className="info-label">Vue:</span>
                        <span className="info-value">&nbsp; {post.vistas}</span>
                    </div>
                )}

                {(post.likes || []).length > 0 && (
                    <div className="info-item">
                        <i className="fas fa-thumbs-up"></i>
                        <span className="info-label">Likes:</span>
                        <span className="info-value">&nbsp;{post.likes.length}</span>
                    </div>
                )}

                {(post.comments || []).length > 0 && (
                    <div className="info-item">
                        <i className="fas fa-comments"></i>
                        <span className="info-label">Commentaires:</span>
                        <span className="info-value">&nbsp;{(post.comments || []).length}</span>
                    </div>
                )}

                {post.attributes.comentarios && (
                    <div className="info-item">
                        <i className="fas fa-comments"></i>
                        <span className="info-label">{t("allowComments", { lng: language })}:</span>
                        <span className="info-value">&nbsp;{post.comentarios || t("notSpecified", { lng: language })}</span>
                    </div>
                )}

                {post.attributes.superficie && (
                    <div className="info-item">
                        <i className="fas fa-ruler"></i>
                        <span className="info-label">Superficie:</span>
                        <span className="info-value">&nbsp;{post.attributes.superficie}&nbsp;  M²</span>
                    </div>
                )}

                {post.attributes.etage && (
                    <div className="info-item">
                        <i className="fas fa-building"></i>
                        <span className="info-label">Etage(s):</span>
                        <span className="info-value">&nbsp;{post.attributes.etage}</span>
                    </div>
                )}

                {post.attributes.piece && (
                    <div className="info-item">
                        <i className="fas fa-cogs"></i>
                        <span className="info-label">Pièces:</span>
                        <span className="info-value">&nbsp;{post.attributes.piece}</span>
                    </div>
                )}

                {post.attributes.promoteurimmobilier !== undefined && (
                    <div className="info-item">
                        <i className="fas fa-user-tie"></i>
                        <span className="info-label">Promotion immobilière:</span>
                        <span className="info-value">&nbsp;{post.attributes.promoteurimmobilier ? "Oui" : "Non"}</span>
                    </div>
                )}

                {post.attributes.parlepromoteurimmobilier !== undefined && (
                    <div className="info-item">
                        <i className="fas fa-user"></i>
                        <span className="info-label">Parle du promoteur immobilier:</span>
                        <span className="info-value">&nbsp;{post.attributes.parlepromoteurimmobilier ? "Oui" : "Non"}</span>
                    </div>
                )}


                {post.attributes.conditiondepeyement && post.attributes.conditiondepeyement.length > 0 && (
                    <div className="info-item">
                        <i className="fas fa-credit-card"></i>
                        <span className="info-label">Conditions de paiement:</span>
                        <span className="info-value">
                            &nbsp; {post.attributes.conditiondepeyement.join(", ")}
                        </span>
                    </div>
                )}

                {post.attributes.specifications && post.attributes.specifications.length > 0 && (
                    <div className="info-item">
                        <i className="fas fa-list-ul"></i>
                        <span className="info-label">Spécifications:</span>
                        <span className="info-value">
                            &nbsp;{post.attributes.specifications.join(", ")}
                        </span>
                    </div>
                )}

                {post.attributes.papiers && post.attributes.papiers.length > 0 && (
                    <div className="info-item">
                        <i className="fas fa-file-alt"></i>
                        <span className="info-label">Papiers:</span>
                        <span className="info-value">
                            &nbsp; {post.attributes.papiers.join(", ")}
                        </span>
                    </div>
                )}

                {post.price && (
                    <div className="info-item">
                        <i className={`fas ${post.price > 100 ? 'fa-tag' : 'fa-dollar-sign'}`}></i>
                        <span className="info-label">Prix:</span>
                        <span className="info-value">&nbsp; {post.price}&nbsp; {post.unidaddeprecio}</span>
                    </div>
                )}

                {post.oferta && (
                    <div className="info-item">
                        <i className={`fas ${post.oferta === 'si' ? 'fa-percent' : 'fa-times-circle'}`}></i>
                        <span className="info-label">Type d'offre:</span>
                        <span className="info-value">&nbsp;{post.oferta}</span>
                    </div>
                )}

                {post.change && (
                    <div className="info-item">
                        <i className={`fas ${post.change === 'yes' ? 'fa-sync-alt' : 'fa-arrow-alt-circle-left'}`}></i>
                        <span className="info-label">Changement:</span>
                        <span className="info-value">&nbsp;{post.change}</span>
                    </div>
                )}


                <div className="info-item">
                    <i className="fas fa-comment"></i>
                    <span className="info-label">Wilaya:</span>
                    <span className="info-value">&nbsp;{post.wilaya || t("notSpecified", { lng: language })}</span>
                </div>



                <div className="info-item">
                    <i className="fas fa-map"></i>
                    <span className="info-label">{t("location", { lng: language })}:</span>
                    <span className="info-value">&nbsp;{post.commune || t("notSpecified", { lng: language })}</span>
                </div>


            </div>
        </div>
    );
};

export default DescriptionPost;
