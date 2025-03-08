import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Posts from '../components/home/Posts';
import LoadIcon from '../images/loading.gif';
import WilayaCommune from '../components/WilayaCommune';
import Modal from '../components/Modal'; // Importar el componente Modal
 
const Home = () => {
    const { homePosts } = useSelector(state => state);
    const [filters, setFilters] = useState({
        subCategory: '',
        title: '',
        wilaya: '',
        commune: '',
        startDate: '',
        endDate: '',
        minPrice: '',
        maxPrice: '',
    });
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal

    // Opciones del dropdown para subCategory
    const subCategories = ['Vente', 'Location', 'Echange'];

    // Manejar cambios en los filtros
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    // Función para resetear los filtros
    const resetFilters = () => {
        setFilters({
            subCategory: '',
            title: '',
            wilaya: '',
            commune: '',
            startDate: '',
            endDate: '',
            minPrice: '',
            maxPrice: '',
        });
    };

    // Abrir el modal
    const openModal = () => {
        setIsModalOpen(true);
    };

    // Cerrar el modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="home row mx-0">
            {/* Botón para abrir el modal */}
            <button onClick={openModal} style={styles.searchButton}>
                <span style={styles.searchIcon}>
                    <i className='fas fa-search'></i>
                </span>
                <span>Search</span>
            </button>

            {/* Modal con los filtros */}
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <div className="filters-container">
                    {/* Filtro por subCategory */}
                    <div className="filter-group">
                        <label>Subcategoría:</label>
                        <select
                            name="subCategory"
                            onChange={handleFilterChange}
                            value={filters.subCategory}
                        >
                            <option value="">Todas las subcategorías</option>
                            {subCategories.map((category, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Filtro por título */}
                    <div className="filter-group">
                        <label>Título:</label>
                        <select
                            name="title"
                            value={filters.title}
                            onChange={handleFilterChange}
                            className="filter-group"
                            required
                        >
                            <option value="">Sélectionner le Titre</option>
                            <option value="Appartement">Appartement</option>
                            <option value="Villa">Villa</option>
                            <option value="Local">Local</option>
                            <option value="Terrain">Terrain</option>
                            <option value="Carcasse">Carcasse</option>
                            <option value="Niveau de villa">Niveau de Villa</option>
                            <option value="Terrain Agricole">Terrain Agricole</option>
                            <option value="Immeuble">Immeuble</option>
                            <option value="Duplex">Duplex</option>
                            <option value="Studio">Studio</option>
                            <option value="Hangar">Hangar</option>
                            <option value="Bungalow">Bungalow</option>
                            <option value="Usine">Usine</option>
                            <option value="Autre">Autre</option>
                        </select>
                    </div>

                    {/* Filtro por Wilaya y Commune */}
                    <div className="filter-group">
                        <WilayaCommune filters={filters} setFilters={setFilters} />
                    </div>

                    {/* Filtro por fecha */}
                    <div className="filter-group">
                        <label>Fecha de inicio:</label>
                        <input
                            type="date"
                            name="startDate"
                            onChange={handleFilterChange}
                            value={filters.startDate}
                        />
                    </div>
                    <div className="filter-group">
                        <label>Fecha de fin:</label>
                        <input
                            type="date"
                            name="endDate"
                            onChange={handleFilterChange}
                            value={filters.endDate}
                        />
                    </div>

                    {/* Filtro por precio */}
                    <div className="filter-group">
                        <label>Precio mínimo:</label>
                        <input
                            type="number"
                            name="minPrice"
                            placeholder="Precio mínimo"
                            onChange={handleFilterChange}
                            value={filters.minPrice}
                        />
                    </div>
                    <div className="filter-group">
                        <label>Precio máximo:</label>
                        <input
                            type="number"
                            name="maxPrice"
                            placeholder="Precio máximo"
                            onChange={handleFilterChange}
                            value={filters.maxPrice}
                        />
                    </div>

                    {/* Botón de Reset */}
                    <div className="filter-group" style={{ gridColumn: '1 / -1' }}>
                        <button onClick={resetFilters} style={styles.resetButton}>
                            Reset
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Mostrar los posts filtrados */}
            {homePosts.loading ? (
                <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
            ) : homePosts.result === 0 && homePosts.posts.length === 0 ? (
                <h2 className="text-center">No Post</h2>
            ) : (
                <Posts filters={filters} />
            )}
        </div>
    );
};

const styles = {
    searchButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.5rem 1rem',
        border: '1px solid #ddd',
        borderRadius: '25px',
        backgroundColor: '#f8f9fa',
        cursor: 'pointer',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
        maxWidth: '400px',
        margin: '0 auto',
    },
    searchIcon: {
        fontSize: '1.1rem',
        color: '#007bff',
        marginRight: '0.5rem',
    },
    resetButton: {
        width: '100%',
        padding: '0.75rem',
        border: 'none',
        borderRadius: '8px',
        backgroundColor: '#dc3545',
        color: '#fff',
        fontSize: '1rem',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    resetButtonHover: {
        backgroundColor: '#c82333',
    },
};

export default Home;