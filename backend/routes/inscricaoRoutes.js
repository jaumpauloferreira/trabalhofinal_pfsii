const express = require('express');
const InscricaoController = require('../controller/inscricaoController');
const router = express.Router();
const inscricaoController = new InscricaoController();

router.get('/', inscricaoController.getAll);
router.get('/:cpf', inscricaoController.filtrar);
router.delete('/:cpf', inscricaoController.deleteInscricao);
router.post('/', inscricaoController.create);
router.put('/:codigo', inscricaoController.update);
router.post('/filtrar', inscricaoController.filtrar); // POST para filtrar por CPF ou Nome

module.exports = router;
