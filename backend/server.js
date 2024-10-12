const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const session = require("express-session"); 
const autenticar = require("./Seguranca/autenticacao").verificarAcesso; 
const loginRoutes = require("./routes/loginRoutes"); 

dotenv.config();

const app = express();
const porta = process.env.PORT || 4000;

app.use(session({
  secret: process.env.SESSION_SECRET || 'chave_secreta_da_sessao',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use("/login", loginRoutes); 

const candidatoRoutes = require("./routes/candidatoRoutes");
app.use("/candidatos", candidatoRoutes);

const vagaRoutes = require("./routes/vagaRoutes");
app.use("/vagas", vagaRoutes);

const inscricaoRoutes = require("./routes/inscricaoRoutes");
app.use("/inscricoes", inscricaoRoutes);

// Rota protegida com autenticação JWT e verificação de sessão
app.use("/protegido", autenticar, (req, res) => {
  res.json({ mensagem: "Acesso autorizado!", usuario: req.usuario });
});

app.listen(porta, () => {
  console.log(`Servidor escutando na porta: ${porta}`);
});
