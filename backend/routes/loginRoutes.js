const express = require('express');
const { assinar } = require('../Seguranca/funcoesJWT'); 
const router = express.Router();
router.post('/login', (req, res) => {
  const { usuario, senha } = req.body;

  // Verifica as credenciais do usuário
  if (usuario === 'admin' && senha === 'admin') {
    const token = assinar({ usuario });
    res.json({ token });
  } else {
    res.status(401).json({ mensagem: 'Usuário ou senha inválidos.' });
  }
});

module.exports = router;
