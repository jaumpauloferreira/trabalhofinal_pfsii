import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Login.css';

function Login({ onLogin }) {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    let usuario = document.getElementById('usuario').value;
    let senha = document.getElementById('senha').value;

    if (usuario === 'admin' && senha === 'admin') {
      setErrorMessage(''); // Limpa mensagem de erro
      navigate('/inscricoes');
      onLogin();
    } else {
      setErrorMessage('Usuário ou senha inválidos.');
    }
  };

  return (
    <div id='login'>
      <h2 id='titulo'>Login</h2>
      <form>
        <div className="row">
          <div className="col-12">
            <div>
              <label id='label' htmlFor="usuario">
                <i className="bi bi-person-fill"></i> Usuário:
              </label>
              <input
                type="text"
                id="usuario"
                name="usuario"
                className="form-control"
                placeholder='Digite o usuário'
                required
              />
              <div className="invalid-feedback">
                Informe o Usuário
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div>
              <label id='label' htmlFor="senha">
                <i className="bi bi-file-lock2"></i> Senha:
              </label>
              <input
                type="password"
                id="senha"
                name="senha"
                className="form-control"
                placeholder='Digite a senha'
                required
              />
            </div>
          </div>
        </div>
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}
        <button type="button" id='botao' className="btn btn-primary" onClick={handleLogin}>
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
