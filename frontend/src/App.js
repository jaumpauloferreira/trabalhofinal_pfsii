import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './COMPONENTES/LOGIN/Login';
import ComponenteMenu from "./COMPONENTES/MENU/ComponenteMenu";
import TabelaInscricoes from './COMPONENTES/FORMULARIOS/TabelaInscricoes';
import DevsPage from './COMPONENTES/DevsPage'; 

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isMenuExpanded, setMenuExpanded] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <BrowserRouter>
      {!isLoggedIn ? (
        <Login path='/cadastro' onLogin={handleLogin} />
      ) : (
        <>
          <ComponenteMenu path='/cadastros' isMenuExpanded={isMenuExpanded} setMenuExpanded={setMenuExpanded} />
          <Routes>
            {/* Rota para Inscrições */}
            <Route path="/inscricoes" element={<TabelaInscricoes isMenuExpanded={isMenuExpanded} />} />
            
            {/* Rota para DEVs */}
            <Route path="/devs" element={<DevsPage />} />
          </Routes>
        </>
      )}
    </BrowserRouter>  
  );
}

export default App;
