import React from 'react';
import { Link } from 'react-router-dom';
import Menu from './Menu';

const Header = () => {
  // CORRECCIÓN: desestructurar correctamente resetFilters
  return (
    <div className="header">
      <nav className="navbar navbar-expand-lg justify-content-between align-middle">
        <Link to="/" className="logo">
          <h1 
            className="navbar-brand text-uppercase p-0 mt-2 ml-5" 
            onClick={() => {
              window.scrollTo({ top: 0 });
               }}
          >
            immobilier
          </h1>
          <img src="icon-web-01.png" className="imagelogo" alt="logo" />
        </Link>
        <Menu />
      </nav>
    </div>
  );
};

 

export default Header;