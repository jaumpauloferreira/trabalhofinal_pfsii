import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

function DevsPage() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      textAlign: 'center',
      width: '100vw', 
    }}>
      <div>
        <h1>Desenvolvedores do Sistema SRO</h1>
        <p><i className="bi bi-person-circle"></i> João Paulo Ferreira da Silva – RA: 10482315304</p>
        <p><i className="bi bi-person-circle"></i> Vitor Medeiros Carriel – RA: 10482313972</p>
      </div>
    </div>
  );
}

export default DevsPage;
