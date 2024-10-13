const { assinar, verificarAssinatura } = require('./funcoesJWT');

function autenticar(req, res) {
  const usuario = req.body.usuario;
  const senha = req.body.senha;

  if (usuario === 'admin' && senha === 'admin') {
    req.session.usuarioAutenticado = usuario;
    res.json({
      status: true,
      mensagem: "Logado com sucesso!",
      token: assinar({ usuario })
    });
  } else {
    req.session.usuarioAutenticado = null;
    res.status(401).json({
      status: false,
      mensagem: "Usuário ou senha inválidos!"
    });
  }
}

function verificarAcesso(req, res, next) {
  const token = req.headers['authorization'];
  let tokenDecodificado;

  if (token) {
    tokenDecodificado = verificarAssinatura(token.split(' ')[1]);
  }

  if (tokenDecodificado && tokenDecodificado.usuario === req.session.usuarioAutenticado) {
    next();
  } else {
    res.status(401).json({
      status: false,
      mensagem: "Acesso não autorizado. Faça o login na aplicação!"
    });
  }
}

module.exports = { autenticar, verificarAcesso };


