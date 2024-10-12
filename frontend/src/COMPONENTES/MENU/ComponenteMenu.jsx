import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom'; 
import './ComponenteMenu.css';

function ComponenteMenu({ isMenuExpanded, setMenuExpanded }) {
  const [itemSelecionado, setItemSelecionado] = useState("/devs");
  const navigate = useNavigate(); 
  const location = useLocation(); 

  const menuItems = [
    { name: "Inscrições", path: "/inscricoes", iconClass: "bi bi-person-badge-fill" },
    { name: "Voltar", path: "voltar", iconClass: "fas fa-arrow-left" }, 
    { name: "Sair", path: "sair", iconClass: "bi bi-box-arrow-right" } 
  ];

  const handleMenuItemClick = (path) => {
    if (path === "sair") {
      window.location.href = 'http://localhost:3000';
    } else if (path === "voltar") {
      navigate(-1);
    } else {
      setItemSelecionado(path);
    }
  };

  return (
    <div>
      <nav
        className={`sidebar ${isMenuExpanded ? 'expanded' : ''}`}
        onMouseEnter={() => setMenuExpanded(true)}
        onMouseLeave={() => setMenuExpanded(false)}
      >
        <div className="logo"></div>
        <ul className="menu">
          {menuItems.map(item => (
            <li
              key={item.path}
              className={itemSelecionado === item.path ? 'highlighted' : ''}
              onClick={() => handleMenuItemClick(item.path)}
            >
              <NavLink to={item.path !== "sair" && item.path !== "voltar" ? item.path : "#"}>
                <i className={item.iconClass}></i>
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
          
          {/* Coloca o item DEVs no final da lista, mas posicionado na parte inferior */}
          <li
            className={`devs-item ${itemSelecionado === "/devs" ? 'highlighted' : ''}`}
            onClick={() => handleMenuItemClick("/devs")}
          >
            <NavLink to="/devs">
              <i className="bi bi-laptop"></i>
              <span>DEVs</span>
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Renderiza o cabeçalho apenas se não estiver na página /devs */}
      {location.pathname !== "/devs" && (
        <div id='cabecalho' className={isMenuExpanded ? 'expanded' : ''}>
          <div className="main--content">
            <div className="header--wrapper">
              <div className="header--title">
                <h3 id='texto'> Sistema de Recrutamento Online - SRO </h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ComponenteMenu;

