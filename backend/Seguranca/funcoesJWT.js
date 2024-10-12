const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

if (!secret) {
  throw new Error('JWT_SECRET não definido no arquivo .env');
}

function assinar(dados) {
  try {
    return jwt.sign(dados, secret, { expiresIn: '1h' });
  } catch (error) {
    console.error('Erro ao assinar o token JWT:', error);
    throw error;
  }
}

function verificarAssinatura(token) {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    console.error('Erro ao verificar o token JWT:', err);
    return null;
  }
}

module.exports = { assinar, verificarAssinatura };

